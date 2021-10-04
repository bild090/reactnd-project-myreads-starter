import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BooksApp from './components/BooksApp'
import Search from './components/Search'

class App extends React.Component {
  
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
      .catch((error) => {
        console.log(error);
      })
  };

  moveTo = (book ,event) => {
    let newBooks = [...this.state.books];
    
    if(newBooks.includes(book)){
      for(const b of newBooks){
        if(book.id === b.id){
          b.shelf = event
        }
      }
    }
    else{
      book.shelf = event;
      newBooks.push(book);
    }

    
    this.setState(() =>({
      books: newBooks
    }))

    BooksAPI.update(book, event)
  }

  render() {
    return (
      <div>
        {this.state.books.length !== 0 && <Route exact path='/' render={() => (
          <BooksApp
            books={this.state.books}
            moveTo={this.moveTo}
          />
        )} />}
         {this.state.books.length !== 0 && <Route exact path='/search' render={() => (
          <Search 
          books={this.state.books}
          moveTo={this.moveTo}
          />
        )} />
         }
      </div>
    )
  }
}

export default App
