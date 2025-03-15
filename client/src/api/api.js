import axios from "axios"

const API_BASE_URL = "http://localhost:8000" // Adjust if needed

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true, // Make sure credentials (cookies) are sent with the request
    withXSRFToken: true,
	headers: {
		"Content-Type": "application/json",
        "X-XSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
	},
})

// Attach token if user is logged in
api.interceptors.request.use((config) => {
	const csrfToken = document
		.querySelector('meta[name="csrf-token"]')
		.getAttribute("content")

	if (csrfToken) {
		config.headers["X-XSRF-TOKEN"] = csrfToken // Attach CSRF token to headers
	}

	return config
})

export default api
