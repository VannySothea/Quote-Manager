import React from "react"
import "../styles/Navbar.css"
import { Link } from "react-router-dom"

const NavigationBar = () => {
	return (
		<nav className="navbar">
			<h1>Quote Manager</h1>
			<div className="nav-links">
				<Link to="/">Home</Link>
				<Link to="/favorites">Favorites</Link>
				<Link className="login" to="/login">Login</Link>
			</div>
		</nav>
	)
}
export default NavigationBar
