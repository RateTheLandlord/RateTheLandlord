const people = [
	{
		landlord: 'Lindsay Walton',
		review: 'Test Review',
		reason: 'Profanity',
	},
]

const FlaggedReviews = () => {
	return (
		<div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg container">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								Landlord
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Reason
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
							>
								Review
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Approve</span>
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Remove</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{people.map((person) => (
							<tr key={person.landlord}>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
									{person.landlord}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Reason</dt>
										<dd className="mt-1 truncate text-gray-500">
											{person.reason}
										</dd>
										<dt className="sr-only sm:hidden">Review</dt>
										<dd className="mt-1 truncate text-gray-700 sm:hidden">
											{person.review}
										</dd>
									</dl>
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{person.reason}
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{person.review}
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Approve
									</a>
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Edit
									</a>
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Remove
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default FlaggedReviews
