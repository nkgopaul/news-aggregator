import React, { Component } from 'react'
import firebase from '../firebase.js'

class CommentEntry extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const articleRef = firebase.database().ref('articles').child(this.props.article_id).child('comments')
        const comment = {
            text: e.target.children[0].value,
            date: new Date().getTime(),
            user: {
                uid: this.props.user.uid,
                name: this.props.user.displayName,
                email: this.props.user.email,
            }
        }
        articleRef.push(comment)
        e.target.reset()
    }


    render() {
        return (
            <section className='add-comment'>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" placeholder="Enter comment" />
                    <button>Submit</button>
                </form>
            </section>
        )
    }
}

export default CommentEntry