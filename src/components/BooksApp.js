import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


import Shelf from './Shelf'
import '../App.css'

class BooksApp extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired
  }

  render() {
    const {books, moveTo} = this.props;

    let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    let wantToRead = books.filter(book => book.shelf === "wantToRead")
    let read = books.filter(book => book.shelf === "read")
    
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Shelf moveTo={moveTo} shelfType={currentlyReading} title="Currently Reading" />
        <Shelf moveTo={moveTo} shelfType={wantToRead} title="Want To Read"/>
        <Shelf moveTo={moveTo} shelfType={read} title="Read"/>
        
        <div className="open-search">
          <Link to='/search'>
            <button>
            Add a book
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
