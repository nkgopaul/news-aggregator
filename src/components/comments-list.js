import React from 'react'
import styles from './comments-list.css'

const CommentsList = ({comments}) => {
    return (
        <div>
            <ul className={styles.list}>
                {Object.entries(comments).map((type) => 
                    <li className={styles.commentLi} key={type}>
                        <p className={styles.submitBy}> {type[1].user.name} at {new Date(type[1].date).toLocaleString()} </p>
                        <p className={styles.text}> "{type[1].text}" </p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default CommentsList