import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

//Global layout holder.

function Layout({children}): JSX.Element {
	return (
		<>
			<Navbar />
			<div className="flex justify-center min-h-screen" data-testid="layout-1">{children}</div>
			<Footer />
		</>
	)
}

export default Layout
