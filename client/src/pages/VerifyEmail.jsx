import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { verifyEmail } from "../store/authSlice"
import { useDispatch, useSelector } from "react-redux"

const EmailVerification = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""])
	const inputRefs = useRef([])

	const handleChange = (index, value) => {
		const newCode = [...code]

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("")
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || ""
			}
			setCode(newCode)

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
			inputRefs.current[focusIndex].focus()
		} else {
			newCode[index] = value
			setCode(newCode)

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus()
			}
		}
	}

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}

	const { loading, error, success } = useSelector((state) => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleVerifyEmail = async (e) => {
		e.preventDefault()
		const verificationCode = code.join("")
		try {
			dispatch(verifyEmail(verificationCode))
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (success.verifyEmail) {
			navigate("/login")
		}
	}, [success.verifyEmail, navigate])

	const handlePaste = (e) => {
		e.preventDefault() // Prevent default pasting behavior

		const pastedData = e.clipboardData.getData("text").slice(0, 6) // Get first 6 characters
		const newCode = pastedData.split("")

		// Fill the code state with the pasted characters
		setCode((prevCode) => {
			const updatedCode = [...prevCode]
			newCode.forEach((char, index) => {
				updatedCode[index] = char
			})
			return updatedCode
		})

		// Move focus to the last filled input or the first empty one
		const lastFilledIndex = newCode.length - 1
		const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
		inputRefs.current[focusIndex].focus()
	}

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleVerifyEmail(new Event("submit"))
		}
	}, [code])

	return (
		<div className="authentication-modal">
			<div className="authentication-modal-content">
				<h2>Verify Your Email</h2>
				<p className="description">
					Enter the 6-digit code sent to your email address. (if you don't see the email, check your spam folder)
				</p>
				<div className="digit-codes-container">
					<div className="card">
						<form onSubmit={handleVerifyEmail}>
							<div className="input-container">
								{code.map((digit, index) => (
									<input
										key={index}
										ref={(el) => (inputRefs.current[index] = el)}
										type="text"
										maxLength="1"
										value={digit}
										onChange={(e) => handleChange(index, e.target.value)}
										onKeyDown={(e) => handleKeyDown(index, e)}
										onPaste={handlePaste} // Add the onPaste event here
										className="input-field"
									/>
								))}
							</div>

							<button
								type="submit"
								disabled={code.some((digit) => !digit)}
								className="submit">
								Verify Email
							</button>
							{error && <p className="error">{error}</p>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmailVerification
