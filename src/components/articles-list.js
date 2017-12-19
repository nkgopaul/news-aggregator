import React, { Component } from 'react'
import firebase from '../firebase.js'
import Article from './article.js'

class ArticlesList extends Component {
    constructor() {
        super()
        this.state = {
          articles_data: [],
          sort_by: 'Date',
        }
        this.changeFilter = this.changeFilter.bind(this)
        this.handleSort = this.handleSort.bind(this)        
      }

    componentDidMount() {
        const articlesRef = firebase.database().ref('articles')
        articlesRef.on('value', (snapshot) => {
            let articles = snapshot.val()
            let newState = []
            for (let article in articles) {
                newState.push({
                    id: article,
                    title: articles[article].title,
                    author: articles[article].author,
                    url: articles[article].url,
                    user: articles[article].user,
                    date_added: articles[article].date_added,
                    upvotes: articles[article].upvotes,
                    comments: articles[article].comments,             
                })
            }
            this.setState({
                articles_data: newState,
            })
        })
    }

    changeFilter = (e) => {
        this.setState({
            sort_by: e.target.options[e.target.selectedIndex].innerText,
        })
    }

    handleSort = (arr) => {
        if (this.state.sort_by==='Date') {
            return arr.sort((a, b) => b.date_added-a.date_added)
        } else if (this.state.sort_by==='Alphabetically') {
            return arr.sort((a, b) => {
                let textA = a.title[0].toUpperCase()
                let textB = b.title[0].toUpperCase()
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
        }
    }

    render() {
        const sorted_data = this.handleSort(this.state.articles_data)
        return (
            <section className='articles-list'> 
                <div className='wrapper'>
                    <select onChange={this.changeFilter}>
                        <option>Date</option>
                        <option>Alphabetically</option>
                    </select>
                    <ul>
                        {sorted_data.map((article) => 
                            <Article
                                key={article.id}
                                id={article.id}
                                url={article.url}
                                title={article.title}
                                author={article.author}
                                upvotes={article.upvotes}
                                user={this.props.user}
                                date_added={article.date_added}
                                comments={article.comments}
                            />
                        )}
                    </ul>
                </div>
            </section>
        )
    }
}

export default ArticlesList