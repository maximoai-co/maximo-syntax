// maximosyntax_change - updated logo for Maximo Syntax
import React, { useState, useEffect } from "react"

const getIsLightThemeFromEditor = () =>
	document.body.classList.contains("vscode-light") || document.body.classList.contains("vscode-high-contrast-light")

export const KiloLogo = () => {
	const [isLightTheme, setIsLightTheme] = useState(getIsLightThemeFromEditor)

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setIsLightTheme(getIsLightThemeFromEditor())
		})
		observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
		return () => observer.disconnect()
	}, [])

	return (
		<img
			src={isLightTheme ? "./assets/icons/maximo-dark.png" : "./assets/icons/maximo.png"}
			alt="Maximo Syntax"
			style={{ width: "100%", height: "100%", objectFit: "contain" }}
		/>
	)
}
