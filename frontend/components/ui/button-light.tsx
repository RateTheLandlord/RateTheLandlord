import React from 'react'

//Default Button. Design determined by Figma
function ButtonLight({
	children,
	onClick,
}: {
	children: string
	onClick?: () => void
}): JSX.Element {
	return (
		<button
			type="reset"
			onClick={onClick}
			className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
		>
			{children}
		</button>
	)
}

export default ButtonLight
