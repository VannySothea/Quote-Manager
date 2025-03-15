import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/api"

// Login Action
export const login = createAsyncThunk(
	"auth/login",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await api.post("/login", credentials)
			localStorage.setItem("token", response.data.token)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Login failed")
		}
	}
)

// Logout Action
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await api.post("/logout")
			localStorage.removeItem("token")
			return null
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Logout failed")
		}
	}
)

// Register Action
export const register = createAsyncThunk(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await api.post("/register", userData) 
			if (response.status === 200) {
                return { success: true } // We just return a flag
            } else {
                return rejectWithValue("Unexpected response from server")
            }
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Registration failed")
		}
	}
)

export const verifyEmail = createAsyncThunk(
	"auth/verifyEmail",
	async (otp, { rejectWithValue }) => {
		try {
			const response = await api.post("/verify-email", { otp })
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || "Verification failed")
		}
	}
)

// Auth Slice
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: localStorage.getItem("token") || null,
		success: { login: false, logout: false, register: false },
		loading: { login: false, logout: false, register: false },
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Login Cases
			.addCase(login.pending, (state) => {
				state.loading.login = true
				state.error = null
                state.success = false
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.token = action.payload.token
				state.loading.login = false
                state.success = true
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.payload
				state.loading.login = false
                state.success = false
			})

			// Logout Cases
			.addCase(logout.pending, (state) => {
				state.loading.logout = true
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
				state.token = null
				state.loading.logout = false
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.payload
				state.loading.logout = false
			})

			// Register Cases
			.addCase(register.pending, (state) => {
				state.error = null
				state.loading.register = true
				state.success.register = false
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.loading.register = false
				state.success.register = true
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.payload
				state.loading.register = false
				state.success.register = false
			})

			// Verify Email Cases
			.addCase(verifyEmail.pending, (state) => {
				state.error = null
				state.loading.verifyEmail = true
				state.success.verifyEmail = false
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.loading.verifyEmail = false
				state.success.verifyEmail = true
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.error = action.payload
				state.loading.verifyEmail = false
				state.success.verifyEmail = false
			})
	},
})

export default authSlice.reducer
