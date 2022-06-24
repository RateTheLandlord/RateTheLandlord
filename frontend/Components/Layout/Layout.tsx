import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

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
