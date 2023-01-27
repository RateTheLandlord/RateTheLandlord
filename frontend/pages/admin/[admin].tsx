import React, {useState} from 'react'
import Tabs from '@/components/admin/tabs/Tabs'
import {ITabs} from '@/components/admin/types/types'
import FlaggedReviews from '@/components/admin/sections/FlaggedReviews'
import TeamMembers from '@/components/admin/sections/TeamMembers'
import MyInfo from '@/components/admin/sections/MyInfo'

//Items to display on this page should be reported comments for review

const startingTabs = [
	{name: 'Flagged Reviews', component: <FlaggedReviews />, current: true},
	{name: 'Team Members', component: <TeamMembers />, current: false},
	{name: 'My Info', component: <MyInfo />, current: false},
]

function Admin(): JSX.Element {
	const [tabs, setTabs] = useState<Array<ITabs>>(startingTabs)
	const [currentTab, setCurrentTab] = useState<ITabs>(tabs[0])
	const [currentSection, setCurrentSection] = useState<JSX.Element>(
		currentTab.component,
	)
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
