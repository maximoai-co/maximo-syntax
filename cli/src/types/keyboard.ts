/**
 * Keyboard Types
 *
 * Re-exports types from @maximo-syntax/core-schemas for runtime validation
 * and backward compatibility with existing code.
 */

// Re-export all keyboard types from core-schemas
export {
	// Schemas
	keySchema,
	readlineKeySchema,
	keyboardProviderConfigSchema,
	// Types
	type Key,
	type ReadlineKey,
	type KeyboardProviderConfig,
	type KeypressHandler,
} from "@maximo-syntax/core-schemas"
