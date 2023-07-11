import Link from 'next/link'
import {Disclosure} from '@headlessui/react'
import {INav} from '@/util/interfaces/interfaces'
import {useTranslation} from 'react-i18next'

interface IProps {
	navigation: Array<INav>
	activeTab: string
}
const MobileNav = ({navigation, activeTab}: IProps) => {
	const {t} = useTranslation('layout')
	return (
		<Disclosure.Panel className="lg:hidden">
			<div className="space-y-1 pt-2 pb-3">
				{navigation.map((link) => (
					<Link key={link.href} href={link.href}>
						<Disclosure.Button
							as="a"
							className={`block cursor-pointer bg-teal-50 py-2 pl-3 pr-4 text-base font-medium text-teal-700 ${
								activeTab === link.href ? 'border-l-4 border-teal-500' : ''
							}`}
						>
							{t(link.name)}
						</Disclosure.Button>
					</Link>
				))}
				<Link href="/create-review">
					<Disclosure.Button
						as="a"
						className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
							activeTab === '/create-review' ? 'border-l-4 border-teal-500' : ''
						}`}
					>
						{t('layout.nav.submit')}
					</Disclosure.Button>
				</Link>
			</div>
		</Disclosure.Panel>
	)
}

export default MobileNav