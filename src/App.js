import React, { Component } from 'react'
import { auth, provider } from './firebase.js'
import Entry from './components/entry.js'
import ArticlesList from './components/articles-list.js'
import styles from './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
    auth.onAuthStateChanged((user) => {
      user ? this.setState({ user: user }) : this.setState({ user: null })
    })
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      })
    })
  }

  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const new_user = result.user
        this.setState({
          user: new_user
        })
      })
  }

  render() {
    return (
      <div className='container'>
        <div className={styles.header}>
          <h1>News Aggregator</h1>
          {this.state.user ? 
            <button onClick={this.logout}>Log Out</button> 
            :
            <button onClick={this.login}>Log In</button> 
          }
        </div>
        {this.state.user ? 
          <div className='article-container'>
            <Entry
              user={this.state.user}
            />
            <ArticlesList
              user={this.state.user}
            />
          </div>
          :
          <div className='wrapper'>
            <p>You must authenticate via Google to view the News Aggregator.</p>
          </div>}
      </div>
    )
  }
}

export default App
