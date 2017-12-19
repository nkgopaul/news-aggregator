import React, { Component } from 'react'
import firebase from '../firebase.js'
import CommentsList from './comments-list.js'
import CommentEntry from './comment-entry.js'

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            upvotes: this.props.upvotes ? this.props.upvotes.length : 0,
        }
        this.handleUpvote = this.handleUpvote.bind(this)
        this.handleUndoUpvote = this.handleUndoUpvote.bind(this)        
    }

    componentDidMount() {
        const articleRef = firebase.database().ref('articles').child(this.props.id)
        articleRef.on('value', (snapshot) => {
            let article = snapshot.val()
            this.setState({
                upvotes: article.upvotes ? article.upvotes : 0,
            })
        })
    }

    handleUpvote = () => {
        const articleRef = firebase.database().ref('articles').child(this.props.id).child('upvotes').child(this.props.user.uid)
        const user = {
            name: this.props.user.displayName,
            email: this.props.user.email,
        }
        articleRef.set(user)
    }

    handleUndoUpvote = () => {
        const articleRef = firebase.database().ref('articles').child(this.props.id).child('upvotes').child(this.props.user.uid)
        articleRef.remove()
    }

    render() {
        return (
            <li key={this.props.id}>
                <h3><a href={this.props.url}>{this.props.title}</a></h3>
                <p>{this.props.author}</p>
                <p>Upvotes {this.props.upvotes ? Object.keys(this.props.upvotes).length : 0}</p>
                {this.props.upvotes && this.props.upvotes[this.props.user.uid] ? 
                    <button onClick={this.handleUndoUpvote}>Undo Upvote</button>                  
                    :
                    <button onClick={this.handleUpvote}>Upvote</button>
                }
                <p>Submitted by {this.props.user.displayName} at {new Date(this.props.date_added).toLocaleString()}</p>
                {this.props.comments ?
                    <CommentsList 
                        comments={this.props.comments}
                    />
                    :
                    null
                }
                <CommentEntry
                    user={this.props.user}
                    article_id={this.props.id}
                />
            </li>
        )
    }
}

export default Article