import React from "react"

const SavedQuoteCard = ({ 
    quote,
    onDelete
 }) => {
    return (
        <div className="quote-card">
            <p>"{quote.content}"</p>
            <p className="author">- {quote.author}</p>
            <button className="btn btn-delete" onClick={onDelete}>
                Delete
            </button>
        </div>
    )
}

export default SavedQuoteCard
