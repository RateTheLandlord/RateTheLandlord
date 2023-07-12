import React from 'react'

interface IProps {
	children: string
	onClick?: () => void
	umami: string
}
function ButtonLight({children, onClick, umami}: IProps): JSX.Element {
	return (
		<button
			data-umami-event={umami}
			type="reset"
			onClick={onClick}
			className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
			data-testid="light-button"
		>
			{children}
		</button>
	)
}

export default ButtonLight