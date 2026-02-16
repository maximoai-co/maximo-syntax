// ============================================
// SHARED TYPES - Import from @maximo-syntax/types
// ============================================
import type {
	ProviderSettings,
	ProviderSettingsEntry,
	ProviderName,
	HistoryItem,
	ModeConfig,
	TodoItem,
	ClineMessage,
	McpServer,
} from "@maximo-syntax/types"

// ============================================
// SHARED TYPES - Import from @maximo-syntax/types
// ============================================
export type {
	WebviewMessage,
	MaybeTypedWebviewMessage,
	UpdateGlobalStateMessage,
	ClineAskResponse,
	TaskHistoryRequestPayload,
	McpServer,
	McpTool,
	McpResource,
} from "@maximo-syntax/types"

// ============================================
// MODEL TYPES - Import from constants
// ============================================
import type { RouterName, ModelInfo, ModelRecord, RouterModels } from "../constants/providers/models.js"

// ============================================
// RE-EXPORTS for convenience
// ============================================
export type { ProviderSettings, ProviderSettingsEntry, ProviderName, HistoryItem, ModeConfig, TodoItem }

// Alias ClineMessage as ExtensionChatMessage for backward compatibility
export type ExtensionChatMessage = ClineMessage

// Re-export model types
export type { RouterName, ModelInfo, ModelRecord, RouterModels }

// ============================================
// CLI-SPECIFIC TYPES from core-schemas
// ============================================
export {
	// Extension message schemas
	organizationAllowListSchema,
	extensionMessageSchema,
	extensionStateSchema,
	// Extension message types (also exported for backward compat)
	type OrganizationAllowList,
	type Mode,
} from "@maximo-syntax/core-schemas"

// ============================================
// CLI-SPECIFIC TYPES (Interface definitions for complex types
// that require imports from @maximo-syntax/types)
// ============================================

// ExtensionMessage interface with proper typing
export interface ExtensionMessage {
	type: string
	action?: string
	text?: string
	state?: ExtensionState
	images?: string[]
	chatMessages?: ExtensionChatMessage[]
	values?: Record<string, unknown>
	[key: string]: unknown
}

// CLI-specific ExtensionState with proper typing
export interface ExtensionState {
	version: string
	apiConfiguration: ProviderSettings
	currentApiConfigName?: string
	listApiConfigMeta?: ProviderSettingsEntry[]
	chatMessages: ExtensionChatMessage[]
	clineMessages?: ExtensionChatMessage[] // Cline Legacy
	currentTaskItem?: HistoryItem
	currentTaskTodos?: TodoItem[]
	mode: string
	customModes: ModeConfig[]
	taskHistoryFullLength: number
	taskHistoryVersion: number
	mcpServers?: McpServer[]
	telemetrySetting: string
	renderContext: "sidebar" | "editor" | "cli"
	cwd?: string
	organizationAllowList?: import("@maximo-syntax/core-schemas").OrganizationAllowList
	routerModels?: RouterModels
	appendSystemPrompt?: string // Custom text to append to system prompt (CLI only)
	[key: string]: unknown
}
