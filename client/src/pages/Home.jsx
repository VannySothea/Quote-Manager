import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import QuoteCard from "../components/QuoteCard"
import Loading from "../components/Loading"
import "../styles/Home.css"

import { fetchRandomQuote, saveQuote } from "../store/quoteSlice"

const Home = () => {
	const dispatch = useDispatch()
	const { currentQuote, loading, error, successMessage } = useSelector(
		(state) => state.quotes
	)

	useEffect(() => {
		dispatch(fetchRandomQuote())
	}, [dispatch])

	const handleSaveQuote = () => {
		if (currentQuote) {
			const quote = {
				content: currentQuote.q,
				author: currentQuote.a,
			}
			dispatch(saveQuote(quote))
		}
	}

	return (
		<div className="container">
			<h2>Random Quote Generator</h2>

			{/* Show errors */}
			{error && <p className="error">{error}</p>}

			{/* Show success message */}
			{successMessage && <p className="success">{successMessage}</p>}

			{/* Show loading spinner only when fetching a new quote */}
			{loading.fetch ? (
				<Loading />
			) : (
				currentQuote && <QuoteCard quote={currentQuote} />
			)}

			<div className="buttons">
				<button
					className="btn btn-new"
					onClick={() => dispatch(fetchRandomQuote())}
					disabled={loading.fetch} // Disable while loading
				>
					{loading.fetch ? "Loading..." : "Generate new Quote"}
				</button>

				<button
					className="btn btn-fav"
					onClick={handleSaveQuote}
					disabled={!currentQuote || loading.save} // Disable while saving
				>
					{loading.save ? "Saving..." : "Save Quote"}
				</button>
			</div>
		</div>
	)
}

export default Home
