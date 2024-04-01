import React from 'react'

function CommentList({comments}) {
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