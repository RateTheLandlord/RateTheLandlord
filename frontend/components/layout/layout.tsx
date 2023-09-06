import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import {useFlags} from 'flagsmith/react'
import Banner from '@/components/layout/Banner'

function Layout({children}: {children: JSX.Element}): JSX.Element {
	const {maintenance_mode} = useFlags(['maintenance_mode'])
	console.log(maintenance_mode)
	return (
		<>
			<Navbar />
			<Banner />
			<div className="flex min-h-screen justify-center" data-testid="layout-1">
				{children}
			</div>
			<Footer />
		</>
	)
}

export default Layout