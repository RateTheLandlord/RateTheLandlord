import React from 'react'

export default function Logo({styling}: {styling: string}) {
	return (
		<svg
			className={styling}
			width="80"
			height="80"
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M40.0005 0C17.908 0 0 17.908 0 40.0005C0 62.092 17.908 80 40.0005 80C62.092 80 80 62.092 80 40.0005C80.001 17.908 62.093 0 40.0005 0ZM52.7698 64.4192H27.1973L33.9907 39.473C30.0377 37.3124 27.3598 33.1207 27.3598 28.3038C27.3598 21.278 33.057 15.5819 40.0818 15.5819C47.1055 15.5819 52.8037 21.277 52.8037 28.3038C52.8037 33.1906 50.0436 37.4286 46 39.5593L52.7698 64.4192Z"
				fill="black"
			/>
		</svg>
	)
}
