// maximosyntax_change - new file
/**
 * Maximo AI Provider
 *
 * Native provider for Maximo AI's Pandora models.
 * OpenAI-compatible API at https://api.maximoai.co/v1
 */

import { Anthropic } from "@anthropic-ai/sdk"
import OpenAI from "openai"

import {
	type ModelInfo,
	maximoAiDefaultModelId,
	MaximoAiModelId,
	maximoAiModels,
	MAXIMO_AI_DEFAULT_TEMPERATURE,
} from "@maximo-syntax/types"

import type { ApiHandlerOptions } from "../../shared/api"
import { ApiStream, ApiStreamUsageChunk } from "../transform/stream"
import { getModelParams } from "../transform/model-params"
import { convertToOpenAiMessages } from "../transform/openai-format"

import { OpenAiHandler } from "./openai"
import type { ApiHandlerCreateMessageMetadata } from "../index"
import { handleOpenAIError } from "./utils/openai-error-handler"

/**
 * Maximo AI Provider Handler
 *
 * Provides access to Maximo AI's Pandora models through an OpenAI-compatible API.
 * Supports streaming, tool calls, and structured outputs.
 */
export class MaximoAiHandler extends OpenAiHandler {
	constructor(options: ApiHandlerOptions) {
		super({
			...options,
			openAiApiKey: options.maximoAiApiKey ?? "not-provided",
			openAiModelId: options.apiModelId ?? maximoAiDefaultModelId,
			openAiBaseUrl: "https://api.maximoai.co/v1",
			openAiStreamingEnabled: true,
			includeMaxTokens: true,
		})
	}

	override getModel() {
		const id = this.options.apiModelId ?? maximoAiDefaultModelId
		const info = maximoAiModels[id as MaximoAiModelId] ?? maximoAiModels[maximoAiDefaultModelId]
		const params = getModelParams({ format: "openai", modelId: id, model: info, settings: this.options })
		return { id, info, ...params }
	}

	override async *createMessage(
		systemPrompt: string,
		messages: Anthropic.Messages.MessageParam[],
		metadata?: ApiHandlerCreateMessageMetadata,
	): ApiStream {
		const modelId = this.options.apiModelId ?? maximoAiDefaultModelId
		const { info: modelInfo, temperature, maxTokens } = this.getModel()

		// Convert messages to OpenAI format
		const openAiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
			{ role: "system", content: systemPrompt },
			...convertToOpenAiMessages(messages),
		]

		const requestOptions: OpenAI.Chat.ChatCompletionCreateParamsStreaming = {
			model: modelId,
			messages: openAiMessages,
			temperature: temperature ?? MAXIMO_AI_DEFAULT_TEMPERATURE,
			stream: true as const,
			stream_options: { include_usage: true },
			...(maxTokens && { max_tokens: maxTokens }),
			...(metadata?.tools && { tools: this.convertToolsForOpenAI(metadata.tools) }),
			...(metadata?.tool_choice && { tool_choice: metadata.tool_choice }),
			...(metadata?.toolProtocol === "native" && {
				parallel_tool_calls: metadata.parallelToolCalls ?? false,
			}),
		}

		let stream
		try {
			stream = await this.client.chat.completions.create(requestOptions)
		} catch (error) {
			throw handleOpenAIError(error, "Maximo AI")
		}

		let lastUsage: any = undefined
		const pendingToolCalls = new Map<string, { id: string; name: string; arguments: string }>()

		for await (const chunk of stream) {
			const delta = chunk.choices?.[0]?.delta ?? {}
			const usage = chunk.usage

			if (usage) {
				lastUsage = usage
			}

			if (delta.content) {
				yield { type: "text", text: delta.content }
			}

			// Handle tool calls
			if (delta.tool_calls) {
				for (const toolCall of delta.tool_calls) {
					const id = toolCall.id ?? `tool_${Date.now()}`
					const name = toolCall.function?.name ?? ""
					const args = toolCall.function?.arguments ?? ""

					if (!pendingToolCalls.has(id)) {
						pendingToolCalls.set(id, { id, name, arguments: "" })
					}

					const existing = pendingToolCalls.get(id)!
					existing.arguments += args

					// Yield partial tool call
					yield {
						type: "tool_call_partial",
						index: 0,
						id,
						name,
						arguments: args,
					}
				}
			}

			// Handle reasoning content (for models that support it)
			if ((delta as any)?.reasoning_content) {
				yield { type: "reasoning", text: (delta as any).reasoning_content }
			}
		}

		// Yield complete tool calls
		for (const [id, toolCall] of pendingToolCalls) {
			yield {
				type: "tool_call",
				id,
				name: toolCall.name,
				arguments: toolCall.arguments,
			}
		}

		// Yield usage
		if (lastUsage) {
			const inputTokens = lastUsage.prompt_tokens ?? 0
			const outputTokens = lastUsage.completion_tokens ?? 0
			const cacheReadTokens =
				lastUsage.cache_read_input_tokens ?? lastUsage.prompt_tokens_details?.cached_tokens ?? 0
			const cacheWriteTokens = lastUsage.cache_creation_input_tokens ?? 0

			yield {
				type: "usage",
				inputTokens,
				outputTokens,
				cacheWriteTokens: cacheWriteTokens > 0 ? cacheWriteTokens : undefined,
				cacheReadTokens: cacheReadTokens > 0 ? cacheReadTokens : undefined,
			} as ApiStreamUsageChunk
		}
	}

	override async completePrompt(prompt: string): Promise<string> {
		const { id: modelId, temperature } = this.getModel()

		try {
			const response = await this.client.chat.completions.create({
				model: modelId,
				messages: [{ role: "user", content: prompt }],
				temperature: temperature ?? MAXIMO_AI_DEFAULT_TEMPERATURE,
				stream: false,
			})

			return response.choices[0]?.message?.content ?? ""
		} catch (error) {
			throw handleOpenAIError(error, "Maximo AI")
		}
	}
}
