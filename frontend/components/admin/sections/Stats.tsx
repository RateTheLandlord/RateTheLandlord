import useSWR from 'swr'
import {useState} from 'react'
import {fetcher} from '@/util/helpers/fetcher'
import StateStats from '../components/StateStats'

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
	total_nz_reviews: {
		total: string
		states: Array<{
			key: string
			total: string
		}>
	}
}

const Stats = () => {
	const [country, setCountry] = useState<string | null>(null)
	const {data, error} = useSWR<IStats, boolean>('/api/get-stats', fetcher)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const handleCountryClick = (country: string) => {
		setCountry(country)
	}

	const renderStats = () => {
		const stats: Array<{
			country: string
			label: string
			data: string
			isActive: boolean
		}> = [
			{
				country: 'CA',
				label: 'Canadian Reviews',
				data: data.total_ca_reviews.total,
				isActive: country === 'CA',
			},
			{
				country: 'US',
				label: 'US Reviews',
				data: data.total_us_reviews.total,
				isActive: country === 'US',
			},
			{
				country: 'UK',
				label: 'UK Reviews',
				data: data.total_uk_reviews.total,
				isActive: country === 'UK',
			},
			{
				country: 'AU',
				label: 'Australia Reviews',
				data: data.total_au_reviews.total,
				isActive: country === 'AU',
			},
			{
				country: 'NZ',
				label: 'New Zealand Reviews',
				data: data.total_nz_reviews.total,
				isActive: country === 'NZ',
			},
		]

		return stats.map((stat) => (
			<div
				key={stat.country}
				onClick={() => handleCountryClick(stat.country)}
				className={`flex cursor-pointer flex-col rounded-xl border p-6 text-center ${
					stat.isActive ? 'bg-gray-200' : ''
				}`}
			>
				<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
					{stat.label}
				</dt>
				<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
					{stat.data}
				</dd>
			</div>
		))
	}

	const renderSelectedStateStats = () => {
		switch (country) {
			case 'CA':
				return <StateStats states={data.total_ca_reviews.states} />
			case 'US':
				return <StateStats states={data.total_us_reviews.states} />
			case 'UK':
				return <StateStats states={data.total_uk_reviews.states} />
			case 'AU':
				return <StateStats states={data.total_au_reviews.states} />
			case 'NZ':
				return <StateStats states={data.total_nz_reviews.states} />
			default:
				return null
		}
	}

	return (
		<div className="container flex w-full flex-wrap justify-center px-4 sm:px-6 lg:px-8">
			<div className="mt-3 flex w-full flex-row justify-center gap-3">
				<div className="flex flex-col p-6 text-center">
					<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
						Total Reviews
					</dt>
					<dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
						{data.total_reviews}
					</dd>
				</div>
				{renderStats()}
			</div>
			{renderSelectedStateStats()}
		</div>
	)
}

export default Stats
