import React, {useState} from 'react'
import Tabs from '@/components/admin/tabs/Tabs'
import {ITabs} from '@/components/admin/types/types'
import FlaggedReviews from '@/components/admin/sections/FlaggedReviews'
import TeamMembers from '@/components/admin/sections/TeamMembers'
import MyInfo from '@/components/admin/sections/MyInfo'
import {parseCookies} from 'nookies'
import Link from 'next/link'

const startingTabs = [
	{name: 'Flagged Reviews', component: <FlaggedReviews />, current: true},
	{name: 'Team Members', component: <TeamMembers />, current: false},
	{name: 'My Info', component: <MyInfo />, current: false},
]

function Admin(): JSX.Element {
	const cookies = parseCookies()
	const [tabs, setTabs] = useState<Array<ITabs>>(startingTabs)
	const [currentTab, setCurrentTab] = useState<ITabs>(tabs[0])
	const [currentSection, setCurrentSection] = useState<JSX.Element>(
		currentTab.component,
	)

	if (!cookies.ratethelandlord) {
		return (
			<div className="w-full flex flex-col items-center gap-4">
				<h1 className="text-center">Not Logged In</h1>
				<Link
					href="/login"
					className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
				>
					Go To Login
				</Link>
			</div>
		)
	}
	return (
		<div className="w-full flex flex-col items-center">
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
