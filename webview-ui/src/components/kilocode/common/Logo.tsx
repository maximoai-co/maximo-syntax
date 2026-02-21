// maximosyntax_change - updated logo for Maximo Syntax
import React from "react"

export default function Logo({ width = 100, height = 100 }: { width?: number; height?: number }) {
	return (
		<img
			src="https://maximoai.co/maximo-vscode-icon-512.png"
			alt="Maximo Syntax"
			width={width}
			height={height}
			className="mb-4 mt-4"
		/>
	)
}
