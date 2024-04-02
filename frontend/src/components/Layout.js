import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
      <Header/>
      <main >
        {children}
      </main>
      <br/>
      <Footer/>
    </div>
  )
}

export default Layout
