// maximosyntax_change - new file
/**
 * Maximo AI Models Configuration
 *
 * Pandora model family for agentic coding and multimodal tasks.
 * API endpoint: https://api.maximoai.co/v1
 */

import type { ModelInfo } from "../model.js"

/**
 * Maximo AI Model IDs
 */
export type MaximoAiModelId =
	| "maximo-pandora-3-pro"
	| "maximo-pandora-3"
	| "maximo-pandora-3-syntax"
	| "maximo-pandora-3-syntax-fast"
	| "maximo-pandora-3.5-syntax-fast"
	| "maximo-pandora-3-mini"
	| "maximo-pandora-3-nano"
	| "maximo-alpha-nano"
	| "maximo-alpha-pro"
	| "maximo-astra-1.2-pro"
	| "maximo-astra-1.2-plus"
	| "maximo-astra-1.2-mini"
	| "maximo-beta-3"
	| "maximo-beta-3-thinking"

/**
 * Default model for Maximo Syntax
 * Pandora 3 Syntax Fast is optimized for agentic coding loops
 */
export const maximoAiDefaultModelId: MaximoAiModelId = "maximo-pandora-3-syntax-fast"

/**
 * Default temperature for Maximo AI models
 */
export const MAXIMO_AI_DEFAULT_TEMPERATURE = 1.0

/**
 * Maximo AI Models Configuration
 *
 * Pricing is per token in USD.
 * Context length and capabilities based on Maximo AI API documentation.
 */
export const maximoAiModels: Record<MaximoAiModelId, ModelInfo> = {
	// ============================================
	// PANDORA 3 FAMILY - General Purpose Models
	// ============================================

	"maximo-pandora-3-pro": {
		description:
			"State-of-the-art multimodal powerhouse. Natively understands and generates images, video, and audio. Features massive knowledge retrieval, advanced coding, and nuanced instruction following. Optimized for high-reasoning tasks and complex agentic workflows.",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 4.25e-6, // $0.00000425 per token
		outputPrice: 2.5e-5, // $0.000025 per token
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3": {
		description:
			"The balanced general-purpose model. Delivers high intelligence and multimodal capabilities at a mid-range price point. Excellent for complex reasoning, content creation, and analysis tasks.",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2e-6, // $0.000002 per token
		outputPrice: 1.2e-5, // $0.000012 per token
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3-syntax": {
		description:
			"The coding-forward general-purpose model. Optimized for structured outputs, complex code generation, and developer workflows. Delivers strong reasoning and precise tool control for advanced automation tasks.",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2e-6, // $0.000002 per token
		outputPrice: 1.2e-5, // $0.000012 per token
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3-syntax-fast": {
		description:
			"A faster, streamlined version of Pandora 3 Syntax designed for agentic coding loops. Optimized for speed and efficiency while maintaining strong coding capabilities.",
		contextWindow: 1_000_000,
		maxTokens: 65_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 5e-7, // $0.0000005 per token
		outputPrice: 2e-6, // $0.000002 per token
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3.5-syntax-fast": {
		description:
			"Pandora 3.5 syntax fast model is a huge update from pandora 3 syntax fast, way more agentic then ever before, has collaborative mode to tackle even more complex problems, and has a better strong self correction, and it is very good at coding, frontend and backend, has an 80.3% score in SWE bench. (Preview)",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0, // Free during preview
		outputPrice: 0, // Free during preview
		isFree: true,
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3-mini": {
		description:
			"A cost-effective, high-throughput model. Designed to offer a sweet spot between the raw speed of Nano and the intelligence of the standard model. Ideal for advanced chatbots, data extraction, and moderate reasoning tasks.",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 1e-6, // $0.000001 per token
		outputPrice: 4e-6, // $0.000004 per token
		supportsReasoningEffort: true,
	},

	"maximo-pandora-3-nano": {
		description:
			"The most efficient model in the Pandora 3 lineup. Optimized for ultra-low latency and high-volume tasks without sacrificing core multimodal capabilities.",
		contextWindow: 1_000_000,
		maxTokens: 60_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 8e-7, // $0.0000008 per token
		outputPrice: 2e-6, // $0.000002 per token
		supportsReasoningEffort: true,
	},

	// ============================================
	// ALPHA FAMILY - Financial Models
	// ============================================

	"maximo-alpha-nano": {
		description:
			"A highly efficient 600B parameter model specialized in Financial Markets trading. Built to be an ultimate authority on trading strategies and economic analysis. Optimized for speed and cost-effectiveness while maintaining strong multimodal capabilities.",
		contextWindow: 163_000,
		maxTokens: 65_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 6.5e-7, // $0.00000065 per token
		outputPrice: 1.7e-6, // $0.0000017 per token
		supportsReasoningEffort: true,
	},

	"maximo-alpha-pro": {
		description:
			"A highly advanced AI model built to be a GOD in Financial Markets trading. The ultimate authority on financial markets, trading strategies, and economic analysis. Features extended context and output capabilities for deep, complex financial reasoning.",
		contextWindow: 262_000,
		maxTokens: 262_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 8e-7, // $0.0000008 per token
		outputPrice: 2.6e-6, // $0.0000026 per token
		supportsReasoningEffort: true,
	},

	// ============================================
	// ASTRA FAMILY - Research Models
	// ============================================

	"maximo-astra-1.2-pro": {
		description:
			"The most intelligent model in the Astra lineup. High-effort reasoning, native audio/video/image understanding, and deep research capabilities. Best for complex coding and analysis.",
		contextWindow: 500_000,
		maxTokens: 128_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2e-6, // $0.000002 per token
		outputPrice: 1.5e-5, // $0.000015 per token
		supportsReasoningEffort: true,
	},

	"maximo-astra-1.2-plus": {
		description:
			"The balanced tier. Strong multimodal capabilities and reasoning at a highly efficient price point. Ideal for general-purpose tasks and standard image analysis.",
		contextWindow: 500_000,
		maxTokens: 128_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 5e-7, // $0.0000005 per token
		outputPrice: 3.5e-6, // $0.0000035 per token
		supportsReasoningEffort: true,
	},

	"maximo-astra-1.2-mini": {
		description:
			"The fastest and most cost-effective model. Perfect for simple queries, summarization, and high-volume tasks.",
		contextWindow: 500_000,
		maxTokens: 128_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 3e-7, // $0.0000003 per token
		outputPrice: 3e-6, // $0.000003 per token
		supportsReasoningEffort: true,
	},

	// ============================================
	// BETA FAMILY - Emotion-Intelligent Models
	// ============================================

	"maximo-beta-3": {
		description:
			"Our most capable emotion-intelligent chat model. Features exceptional conversational abilities with emotionally aware responses, ideal for natural, engaging discussions.",
		contextWindow: 500_000,
		maxTokens: 262_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 6e-7, // $0.0000006 per token
		outputPrice: 1.4e-6, // $0.0000014 per token
		supportsReasoningEffort: true,
	},

	"maximo-beta-3-thinking": {
		description:
			"Full reasoning variant of our most capable emotion-intelligent chat model. Deep thinking with emotionally aware responses for complex, nuanced conversations.",
		contextWindow: 500_000,
		maxTokens: 262_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 1e-6, // $0.000001 per token
		outputPrice: 3e-6, // $0.000003 per token
		supportsReasoningEffort: true,
	},
}

/**
 * Default model info for fallback
 */
export const maximoAiDefaultModelInfo: ModelInfo = maximoAiModels[maximoAiDefaultModelId]
