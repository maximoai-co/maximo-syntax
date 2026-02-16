// Re-export device auth types from @maximo-syntax/types
export type { DeviceAuthInitiateResponse, DeviceAuthPollResponse, DeviceAuthState } from "@maximo-syntax/types"
export { DeviceAuthInitiateResponseSchema, DeviceAuthPollResponseSchema } from "@maximo-syntax/types"

// Kilocode-specific auth types
export * from "./kilocode.js"
