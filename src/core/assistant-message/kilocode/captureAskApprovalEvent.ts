import { TelemetryEventName, ToolName } from "@maximo-syntax/types"
import { TelemetryService } from "@maximo-syntax/telemetry"

export function captureAskApproval(tool: ToolName, isApproved: boolean) {
	TelemetryService.instance.captureEvent(TelemetryEventName.ASK_APPROVAL, { tool, isApproved })
}
