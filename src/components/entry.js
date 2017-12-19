import React, { Component } from 'react'
import firebase from '../firebase.js'
import styles from './entry.css'

class Entry extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const articlesRef = firebase.database().ref('articles')
        const article = {
            title: e.target.children[0].value,
            author: e.target.children[1].value,
            url: e.target.children[2].value,
            user: {
                uid: this.props.user.uid,
                name: this.props.user.displayName,
                email: this.props.user.email,
            },
            date_added: new Date().getTime(),
            upvotes: null,
            downvotes: null,
            comments: null,
        }
        articlesRef.push(article)
        e.target.reset()
    }

    render() {
        return (
            <section className={styles.section}>
                <form onSubmit={this.handleSubmit}>
                    <input className={styles.inputs} type="text" name="title" placeholder="Title" />
                    <input className={styles.inputs} type="text" name="Author" placeholder="Author" />
                    <input className={styles.inputs} type="text" name="URL" placeholder="URL" />
                    <button className={styles.button}>Submit</button>
                </form>
            </section>
        )
    }

}

export default Entry