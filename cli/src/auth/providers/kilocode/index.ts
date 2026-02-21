import type { AuthProvider } from "../../types.js"
import { authenticateWithDeviceAuth } from "./device-auth.js"
import { authenticateWithToken } from "./token-auth.js"

/**
 * Kilocode provider with device authorization (recommended)
 */
export const kilocodeDeviceAuthProvider: AuthProvider = {
	name: "Maximo AI",
	value: "kilocode-device",
	authenticate: authenticateWithDeviceAuth,
}

/**
 * Kilocode provider with manual token entry (advanced)
 */
export const kilocodeTokenAuthProvider: AuthProvider = {
	name: "Maximo AI (Manual)",
	value: "kilocode-token",
	authenticate: authenticateWithToken,
}
