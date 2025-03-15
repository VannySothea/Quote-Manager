import React from "react"
import { Route, Routes } from "react-router-dom"
import NavigationBar from "./components/NavBar.jsx"
import Loading from "./components/Loading.jsx"

import Home from "./pages/Home.jsx"
import Favorites from "./pages/Favorites.jsx"
import Login from "./pages/login.jsx"
import Register from "./pages/Register.jsx"
import EmailVerification from "./pages/VerifyEmail.jsx"

const App = () => {

	return (
		<div>
			<NavigationBar />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/verify-email"
					element={<EmailVerification />}
				/>
				<Route
					path="/favorites"
					element={<Favorites />}
				/>
				<Route
					path="/loading/:path"
					element={<Loading />}
				/>
			</Routes>
		</div>
	)
}

export default App
