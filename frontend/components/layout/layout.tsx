import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

//Global layout holder.

function Layout({children}): JSX.Element {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}

export default Layout
