import React from 'react'

//Default Button. Design determined by Figma

function Button({children}: {children: string}): JSX.Element {
	return (
		<button
			type="submit"
			// onClick={onClick}
			className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
		>
			{children}
		</button>
	)
}

export default Button
