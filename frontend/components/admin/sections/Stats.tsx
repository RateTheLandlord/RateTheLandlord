import useSWR from 'swr'
import StateStats from '../components/StateStats'
import {useState} from 'react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export interface IStats {
	total_reviews: number
	total_ca_reviews: {
		total: string
		states: Array<{
			key: string
			total: string
		}>
	}
	total_us_reviews: {
		total: string
		states: Array<{
			key: string
			total: string
		}>
	}
	total_au_reviews: {
		total: string
		states: Array<{
			key: string
			total: string
		}>
	}
	total_uk_reviews: {
		total: string
		states: Array<{
			key: string
			total: string
		}>
	}
}

const Stats = () => {
	const [country, setCountry] = useState<string | null>(null)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {data, error} = useSWR<IStats>('/api/get-stats', fetcher)
	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const getComponent = () => {
		switch (country) {
			case 'CA':
				return <StateStats states={data.total_ca_reviews.states} />
			case 'US':
				return <StateStats states={data.total_us_reviews.states} />
			case 'UK':
				return <StateStats states={data.total_uk_reviews.states} />
			case 'AU':
				return <StateStats states={data.total_au_reviews.states} />
			default:
				return <></>
		}
	}

	return (
		<div className="container flex w-full flex-wrap justify-center px-4 sm:px-6 lg:px-8">
			<div className="flex w-full flex-row justify-center gap-3">
				<div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						Total Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_reviews}
					</dd>
				</div>
				<div
					onClick={() => setCountry('CA')}
					className={`flex cursor-pointer flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r ${
						country && country === 'CA' ? 'bg-gray-200' : ''
					}`}
				>
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						Canadian Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_ca_reviews.total}
					</dd>
				</div>
				<div
					onClick={() => setCountry('US')}
					className={`flex cursor-pointer flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r ${
						country && country === 'US' ? 'bg-gray-200' : ''
					}`}
				>
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						US Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_us_reviews.total}
					</dd>
				</div>
				<div
					onClick={() => setCountry('UK')}
					className={`flex cursor-pointer flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r ${
						country && country === 'UK' ? 'bg-gray-200' : ''
					}`}
				>
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						UK Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_uk_reviews.total}
					</dd>
				</div>
				<div
					onClick={() => setCountry('AU')}
					className={`flex cursor-pointer flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r ${
						country && country === 'AU' ? 'bg-gray-200' : ''
					}`}
				>
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						Australia Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_au_reviews.total}
					</dd>
				</div>
			</div>
			{getComponent()}
		</div>
	)
}

export default Stats
