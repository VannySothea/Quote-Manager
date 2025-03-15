import { useSelector, useDispatch } from "react-redux"
import React, { useEffect } from "react";
import { fetchFavorites, deleteQuote } from "../store/quoteSlice";
import SavedQuoteCard from "../components/SavedQuoteCard";

const Favorites = () => {
	const dispatch = useDispatch();
    const { favorites, error } = useSelector((state) => state.quotes);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

	return (
		<div className="container">
			<h2>Saved Quotes</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}


			{favorites.length === 0 ? (
				<p>No favorite quotes yet.</p>
			) : (
				favorites.map((quote) => (
					<SavedQuoteCard
						key={quote.id}
						quote={quote}
						showDelete={true} // Display delete button
						onDelete={() => dispatch(deleteQuote(quote.id))} // Dispatch delete action
					/>
				))
			)}
		</div>
	)
}

export default Favorites
