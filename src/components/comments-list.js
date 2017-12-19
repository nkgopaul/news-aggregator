import React from 'react'

const CommentsList = ({comments}) => {
    return (
        <ul>
            {Object.entries(comments).map((type) => 
                <li key={type}>
                    <p> {type[1].user.name} at {new Date(type[1].date).toLocaleString()} </p>
                    <p> {type[1].text} </p>
                </li>
            )}
        </ul>
    )
}

export default CommentsList