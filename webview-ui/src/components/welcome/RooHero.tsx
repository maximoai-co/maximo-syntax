// maximosyntax_change - updated for Maximo Syntax
import { useState } from "react"

const RooHero = () => {
	const [imagesBaseUri] = useState(() => {
		const w = window as any
		return w.IMAGES_BASE_URI || ""
	})

	return (
		<div className="mb-4 relative forced-color-adjust-none group flex flex-col items-center w-30 pt-4 overflow-clip">
			<img src={imagesBaseUri + "/maximo.png"} alt="Maximo Syntax" className="h-12 w-auto object-contain" />
		</div>
	)
}

export default RooHero
