import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { Button } from 'bootstrap'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-transparent">
                <div className="container">
                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse sidebar" id="navbarTogglerDemo01">
                        <div class="offcanvas-header text-white border-bottom">

                            <Link to="/" className="navbar-brand" ><img src='../../natLogo.png' alt='natlogo' height={50} width={40} /></Link>
                            <Link to="/" className="navbar-brand fs-4 title" >Public Health Information System</Link>
                        </div>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <NavLink to='/' className='nav-link'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/clinics' className='nav-link'>Clinics</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/staff' className='nav-link'>Staff</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/vaccines' className='nav-link'>Vaccines</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/DengueHomePage' className='nav-link'>Dengue</NavLink>
                            </li>

                            <li className="nav-item dropdown" onMouseEnter={() => document.getElementById("navbarDropdown").click()}>
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Complains
                                </a>
                                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                    <li><NavLink to='/Complains' className='dropdown-item'>Complains</NavLink></li>
                                    <li><NavLink to='/RaidsHome' className='dropdown-item'>Raids</NavLink></li>
                                    <li><NavLink to='/Fine-And-court' className='dropdown-item'>Fine & Court</NavLink></li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/mainMidwife' className='nav-link'>Midwife</NavLink>
                            </li>      
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header




