import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/api"

// Fetch a random quote
export const fetchRandomQuote = createAsyncThunk(
	"quotes/fetchRandom",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/quotes/random")
			return response.data[0]
		} catch (error) {
			return rejectWithValue("Failed to fetch quote")
		}
	}
)

// Save a quote
export const saveQuote = createAsyncThunk(
	"quotes/save",
	async (quote, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("token")
			if (!token) {
				return rejectWithValue("Token not found")
			}
			const response = await api.post("/quotes", quote, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data.quote
		} catch (error) {
			return rejectWithValue("Failed to save quote")
		}
	}
)

// Fetch favorite quotes
export const fetchFavorites = createAsyncThunk(
	"quotes/fetchFavorites",
	async (_, { rejectWithValue }) => {
		try {
      const token = localStorage.getItem("token")
			if (!token) {
				return rejectWithValue("Token not found")
			}
			const response = await api.get("/quotes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
			return response.data
		} catch (error) {
			return rejectWithValue("Failed to fetch favorites")
		}
	}
)

// Delete a quote
export const deleteQuote = createAsyncThunk(
	"quotes/delete",
	async (id, { rejectWithValue }) => {
		try {
      const token = localStorage.getItem("token")
			if (!token) {
				return rejectWithValue("Token not found")
			}
			await api.delete(`/quotes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
			return id
		} catch (error) {
			return rejectWithValue("Failed to delete quote")
		}
	}
)

// Create the quote slice
const quoteSlice = createSlice({
	name: "quotes",
	initialState: {
		currentQuote: null,
		favorites: [],
		loading: { fetch: false, save: false, delete: false, favorites: false },
		error: null,
		successMessage: null, // Add successMessage to the state
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Random Quote
			.addCase(fetchRandomQuote.pending, (state) => {
				state.loading.fetch = true
				state.error = null
			})
			.addCase(fetchRandomQuote.fulfilled, (state, action) => {
				state.currentQuote = action.payload
				state.loading.fetch = false
			})
			.addCase(fetchRandomQuote.rejected, (state, action) => {
				state.error = action.payload
				state.loading.fetch = false
			})

			// Save Quote
			.addCase(saveQuote.pending, (state) => {
				state.loading.save = true
			})
			.addCase(saveQuote.fulfilled, (state, action) => {
				state.favorites.push(action.payload)
				state.loading.save = false
				state.successMessage = "Quote saved successfully!" // Set success message
			})
			.addCase(saveQuote.rejected, (state, action) => {
				state.error = action.payload
				state.loading.save = false
			})

			// Fetch Favorites
			.addCase(fetchFavorites.pending, (state) => {
				state.loading.favorites = true
			})
			.addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload
				state.loading.favorites = false
			})
			.addCase(fetchFavorites.rejected, (state, action) => {
				state.error = action.payload
				state.loading.favorites = false
			})

			// Delete Quote
			.addCase(deleteQuote.pending, (state) => {
				state.loading.delete = true
			})
			.addCase(deleteQuote.fulfilled, (state, action) => {
				state.favorites = state.favorites.filter((q) => q.id !== action.payload)
				state.loading.delete = false
			})
			.addCase(deleteQuote.rejected, (state, action) => {
				state.error = action.payload
				state.loading.delete = false
			})
	},
})

export default quoteSlice.reducer
