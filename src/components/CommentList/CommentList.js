import React from 'react'

function CommentList({comments}) {
    if (comments.length === 0) {
        return (<div> Be the first to write a review </div>)
    }
    return (
        <div>
            {comments.map(comment =>

            <div className='details__med-comment' key={comment.id}>


            </div>
        )}
        </div>
    )
}

export default CommentList