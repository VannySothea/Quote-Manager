import React, { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../store/authSlice'	


const Register = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [inputType, setInputType] = useState("password")

	const {loading, error, success} = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleRegister = async (e) => {
		e.preventDefault()
		try {
			dispatch(register({ name, email, password }))
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (success.register) {
			navigate("/verify-email")
		}
	}, [success.register, navigate])

	return (
		<div className="authentication-modal">
			<div className="authentication-modal-content">
				<Link
					to="/"
					className="close-btn">
					×
				</Link>
				<h2>Create an Account</h2>
				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="Username"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
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

					<div className="pass-input-container">
						<input
							className="password-input"
							type={showPassword ? "text" : inputType}
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
						disabled={
							password !== confirmPassword && confirmPassword.length > 0 || loading.register
						}>
						{loading.register ? "Registering..." : "Register"}
					</button>
					<Link
						className="back-to-login"
						to="/login">
						Back to Login
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Register
