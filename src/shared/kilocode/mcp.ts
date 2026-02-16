// kilocode_change: imported from Cline

export const DEFAULT_MCP_TIMEOUT_SECONDS = 60 // matches Anthropic's default timeout in their MCP SDK
export const MIN_MCP_TIMEOUT_SECONDS = 1
export type McpMode = "full" | "server-use-only" | "off"

// Re-export canonical types from @maximo-syntax/types to avoid drift between packages.
export type { McpMarketplaceCatalog, McpMarketplaceItem, McpDownloadResponse } from "@maximo-syntax/types" // kilocode_change

export interface McpState {
	mcpMarketplaceCatalog?: import("@maximo-syntax/types").McpMarketplaceCatalog
}
