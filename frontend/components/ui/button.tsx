import React from 'react'

//Default Button. Design determined by Figma

function Button({
	children,
	disabled = false,
	onClick,
}: {
	children: string
	disabled?: boolean
	onClick?: () => void
}): JSX.Element {
	return (
		<button
			onClick={onClick}
			type="submit"
			className={`ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
				disabled ? 'bg-teal-200' : 'bg-teal-600 hover:bg-teal-700'
			}`}
			disabled={disabled}
			data-testid="submit-button-1"
		>
			{children}
		</button>
	)
}

export default Button
