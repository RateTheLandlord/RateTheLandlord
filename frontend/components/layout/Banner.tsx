const Banner = ({text}: {text: string}) => {
	return (
		<div className="flex items-center justify-center gap-x-6 bg-rose-600 px-6 py-2.5">
			<p className="text-sm leading-6 text-white">
				<a href="#">
					<strong className="font-semibold">Maintenance Mode</strong>
					<svg
						viewBox="0 0 2 2"
						className="mx-2 inline h-0.5 w-0.5 fill-current"
						aria-hidden="true"
					>
						<circle cx={1} cy={1} r={1} />
					</svg>
					{text}
				</a>
			</p>
		</div>
	)
}

export default Banner