import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

function Layout({children}): JSX.Element {
	return (
		<>
			<Navbar />
			<div className="flex min-h-screen justify-center" data-testid="layout-1">
				{children}
			</div>
			<Footer />
		</>
	)
}

export default Layout
