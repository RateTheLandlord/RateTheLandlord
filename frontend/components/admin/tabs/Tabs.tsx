import {Dispatch, SetStateAction} from 'react'
import {ITabs} from '../types/types'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

interface IProps {
	currentTab: ITabs
	setCurrentTab: Dispatch<SetStateAction<ITabs>>
	tabs: Array<ITabs>
	setTabs: Dispatch<SetStateAction<Array<ITabs>>>
	setCurrentSection: Dispatch<SetStateAction<JSX.Element>>
}

const Tabs = ({
	currentTab,
	setCurrentTab,
	tabs,
	setTabs,
	setCurrentSection,
}: IProps) => {
	const updateTab = (tab: ITabs) => {
		setCurrentTab(tab)

		const update = tabs.map((obj) => {
			if (obj.name === tab.name) {
				return {...obj, current: true}
			} else {
				return {...obj, current: false}
			}
		})

		setTabs([...update])
		setCurrentSection(tab.component)
	}
	return (
		<div className="container">
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
					defaultValue={currentTab.name}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex" aria-label="Tabs">
						{tabs.map((tab) => (
							<button
								key={tab.name}
								onClick={() => updateTab(tab)}
								className={classNames(
									tab.current
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
									'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm',
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								{tab.name}
							</button>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Tabs
