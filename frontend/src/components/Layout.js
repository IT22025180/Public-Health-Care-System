import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "60vh" }} >
        {children}
      </main>
      <br />
      <Footer />
    </div>
  )
}

export default Layout
