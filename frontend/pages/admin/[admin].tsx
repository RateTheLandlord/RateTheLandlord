import React, {useEffect, useState} from 'react'
import Tabs from '@/components/admin/tabs/Tabs'
import {ITabs} from '@/components/admin/types/types'
import FlaggedReviews from '@/components/admin/sections/FlaggedReviews'
import TeamMembers from '@/components/admin/sections/TeamMembers'
import MyInfo from '@/components/admin/sections/MyInfo'
import {parseCookies} from 'nookies'
import Link from 'next/link'
import {NextSeo} from 'next-seo'
import Stats from '@/components/admin/sections/Stats'

const startingTabs = [
	{name: 'Flagged Reviews', component: <FlaggedReviews />, current: true},
	{name: 'Team Members', component: <TeamMembers />, current: false},
	{name: 'My Info', component: <MyInfo />, current: false},
	{name: 'Stats', component: <Stats />, current: false},
]

function Admin(): JSX.Element {
	const cookies = parseCookies()
	const [tabs, setTabs] = useState<Array<ITabs>>(startingTabs)
	const [currentTab, setCurrentTab] = useState<ITabs>(startingTabs[0])
	const [currentSection, setCurrentSection] = useState<JSX.Element>(
		startingTabs[0].component,
	)

	const [noCookie, setNoCookies] = useState(false)

	useEffect(() => {
		if (!cookies.ratethelandlord) {
			setNoCookies(true)
		}
	}, [cookies.ratethelandlord])

	if (noCookie) {
		return (
			<div className="flex w-full flex-col items-center gap-4">
				<h1 className="text-center">Not Logged In</h1>
				<Link
					href="/login"
					className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
				>
					Go To Login
				</Link>
			</div>
		)
	}
	return (
		<div className="flex w-full flex-col items-center">
			<NextSeo noindex={true} />
			<Tabs
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				tabs={tabs}
				setTabs={setTabs}
				setCurrentSection={setCurrentSection}
			/>
			{currentSection}
		</div>
	)
}

export default Admin
