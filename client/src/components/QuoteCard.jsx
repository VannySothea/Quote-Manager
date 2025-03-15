import React from "react"

const QuoteCard = ({ quote }) => {
	return (
		<div className="quote-card">
			<p>"{quote.q}"</p>
			<p className="author">- {quote.a}</p>
		</div>
	)
}

export default QuoteCard
