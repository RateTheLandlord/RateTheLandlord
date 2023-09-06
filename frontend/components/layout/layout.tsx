'use client'

import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import {useFlags} from 'flagsmith/react'
import Banner from '@/components/layout/Banner'

function Layout({children}: {children: JSX.Element}): JSX.Element {
	const {maintenance_mode} = useFlags(['maintenance_mode'])
	return (
		<>
			<Navbar maintenanceMode={maintenance_mode.enabled} />
			{maintenance_mode.enabled && (
				<Banner text={maintenance_mode.value as string} />
			)}
			<div className="flex min-h-screen justify-center" data-testid="layout-1">
				{children}
			</div>
			<Footer />
		</>
	)
}

export default Layout