const StateStats = ({
	states,
}: {
	states: Array<{
		key: string
		total: string
	}>
}) => {
	const sortedStates = states.sort((a, b) => Number(b.total) - Number(a.total))
	return (
		<div className="flex w-full flex-row flex-wrap gap-2">
			{sortedStates.map((state) => {
				return (
					<div
						key={state.key}
						className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
					>
						<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
							{state.key}
						</dt>
						<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
							{state.total}
						</dd>
					</div>
				)
			})}
		</div>
	)
}

export default StateStats
