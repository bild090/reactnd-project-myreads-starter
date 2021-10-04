import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI'

class Search extends React.Component {

  static propTypes = {
    moveTo: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchBooks: [],
  }


  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    })
    )
      BooksAPI.search(query)
      .then((searchBooks) => {
        
        if(query === ''){

          this.setState(() => ({
            searchBooks: []
          })
          )
        }

        if (searchBooks !== undefined) {
          searchBooks.map(book => (this.props.books.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)))
          this.setState({searchBooks})
        }

      })
      .catch(error => {
      }) 
  }

  render() {
    const { query, searchBooks } = this.state;
    const { moveTo } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" placeholder="Search by title or author" value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchBooks.length > 0 && searchBooks.map(book => {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{
                          width: 128,
                          height: 193,
                          backgroundImage: book.imageLinks !== undefined ? `url(${book.imageLinks.thumbnail})` : ''
                        }}></div>
                        <div className="book-shelf-changer">
                          <select onChange={(event) => moveTo(book, event.target.value)} defaultValue={book.shelf || ''} >
                            <option value="move" disabled>Move to...</option>
                            <option></option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors !== undefined && book.authors.length > 0 && book.authors.map((author, index) => {
                        return (
                          <div key={index} className="book-authors">{author}</div>
                        )
                      })}
                    </div>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}


export default Search;