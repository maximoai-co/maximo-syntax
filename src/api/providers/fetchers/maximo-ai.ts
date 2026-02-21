// maximosyntax_change - new file
/**
 * Maximo AI Models Fetcher
 *
 * Fetches available models from https://api.maximoai.co/v1/models
 */

import { z } from "zod"
import { type ModelInfo, isModelParameter } from "@maximo-syntax/types"
import { parseApiPrice } from "../../../shared/cost"
import { DEFAULT_HEADERS } from "../constants"

/**
 * Maximo AI Model Schema
 */
const maximoAiModelSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	context_length: z.number(),
	max_output_length: z.number().optional(),
	input_modalities: z.array(z.string()).optional(),
	output_modalities: z.array(z.string()).optional(),
	pricing: z
		.object({
			prompt: z.string().optional(),
			completion: z.string().optional(),
		})
		.optional(),
	supported_parameters: z.array(z.string()).optional(),
	supported_features: z.array(z.string()).optional(),
})

const maximoAiModelsResponseSchema = z.object({
	data: z.array(maximoAiModelSchema),
})

type MaximoAiModel = z.infer<typeof maximoAiModelSchema>

/**
 * Fetches available models from Maximo AI API
 */
export async function getMaximoAiModels(): Promise<Record<string, ModelInfo>> {
	const models: Record<string, ModelInfo> = {}
	const baseURL = "https://api.maximoai.co/v1"

	try {
		const response = await fetch(`${baseURL}/models`, {
			headers: DEFAULT_HEADERS,
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch Maximo AI models: ${response.status} ${response.statusText}`)
		}

		const json = await response.json()
		const result = maximoAiModelsResponseSchema.safeParse(json)

		if (!result.success) {
			console.error("Maximo AI models response is invalid", result.error.format())
			// Try to use the data anyway for graceful degradation
		}

		const data = result.success ? result.data.data : (json.data as MaximoAiModel[])

		if (!Array.isArray(data)) {
			throw new Error("Maximo AI models response data is not an array")
		}

		for (const model of data) {
			const modelInfo = parseMaximoAiModel(model)
			if (modelInfo) {
				models[model.id] = modelInfo
			}
		}
	} catch (error) {
		console.error(`Error fetching Maximo AI models: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`)
		throw error
	}

	return models
}

/**
 * Parses a Maximo AI model into ModelInfo format
 */
function parseMaximoAiModel(model: MaximoAiModel): ModelInfo | null {
	const {
		id,
		name,
		description,
		context_length,
		max_output_length,
		input_modalities,
		pricing,
		supported_parameters,
		supported_features,
	} = model

	// Skip models that only output images (not text)
	if (input_modalities?.includes("image") && !input_modalities?.includes("text")) {
		return null
	}

	const supportsImages = input_modalities?.includes("image") ?? false
	const supportsAudio = input_modalities?.includes("audio") ?? false
	const supportsVideo = input_modalities?.includes("video") ?? false

	// Check for tools support
	const supportsNativeTools = supported_features?.includes("tools") ?? false

	// Check for reasoning support
	const supportsReasoningEffort = supported_features?.includes("reasoning") ?? false

	const modelInfo: ModelInfo = {
		maxTokens: max_output_length || Math.ceil(context_length * 0.2),
		contextWindow: context_length,
		supportsImages,
		supportsPromptCache: false,
		inputPrice: parseApiPrice(pricing?.prompt),
		outputPrice: parseApiPrice(pricing?.completion),
		description: description || name,
		displayName: name,
		supportsReasoningEffort,
		supportsNativeTools,
		supportedParameters: supported_parameters?.filter(isModelParameter),
		// Default to native tool protocol when native tools are supported
		defaultToolProtocol: supportsNativeTools ? ("native" as const) : undefined,
	}

	// Add multimodal support flags
	if (supportsAudio) {
		;(modelInfo as any).supportsAudio = true
	}
	if (supportsVideo) {
		;(modelInfo as any).supportsVideo = true
	}

	return modelInfo
}
