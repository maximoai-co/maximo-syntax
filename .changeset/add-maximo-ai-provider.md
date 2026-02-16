---
"maximo-syntax": minor
"@maximo-syntax/types": minor
---

Add native Maximo AI provider integration

Integrates Maximo AI's Pandora models as the native default provider for Maximo Syntax. Features include:

- **New Provider**: `maximo-ai` provider with OpenAI-compatible API at `https://api.maximoai.co/v1`
- **Pandora Models**: Full support for Pandora 3 family (Pro, Standard, Syntax, Syntax Fast, Mini, Nano), Pandora 3.5 Syntax Fast (preview), Alpha models (Nano, Pro), Astra models (1.2 Pro, Plus, Mini), and Beta models (3, 3 Thinking)
- **Default Model**: `maximo-pandora-3-syntax-fast` optimized for agentic coding loops
- **Capabilities**: Streaming, tool calls, structured outputs, and reasoning support
- **Branding**: Updated default headers and user agent for Maximo Syntax

The provider uses API key authentication with the `maximoAiApiKey` setting.
