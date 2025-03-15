import React, { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"

import "../styles/Authentication.css"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [inputType, setInputType] = useState("password")

	const { loading, error, user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			dispatch(login({ email, password }))
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [user, navigate])

	return (
		<div className="authentication-modal">
			<div className="authentication-modal-content">
				<Link
					to="/"
					className="close-btn">
					×
				</Link>
				<h2>Welcome Back</h2>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div className="pass-input-container">
						<input
							className="password-input"
							type={showPassword ? "text" : inputType}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button
							className="show-password-btn"
							type="button"
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
					{error && <p className="error">{error}</p>}
					<button
						className="submit"
						type="submit"
						disabled={loading.login}>
						{loading.login ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
			<div className="register-footer">
				<p>Don't have an account?</p>
				<Link
					to="/register"
					className="register-btn">
					Register
				</Link>
			</div>
		</div>
	)
}

export default Login
