// maximosyntax_change - updated for Maximo Syntax
import React, { useState } from "react"

const RooHero = () => {
	const [iconsBaseUri] = useState(() => {
		const w = window as any
		return w.ICONS_BASE_URI || ""
	})
	return (
		<div className="mb-4 relative forced-color-adjust-none group flex flex-col items-center w-30 pt-4 overflow-clip">
			<img src={`${iconsBaseUri}/maximo.png`} alt="Maximo Syntax" className="h-12 w-auto object-contain" />
		</div>
	)
}

export default RooHero
