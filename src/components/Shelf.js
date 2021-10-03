import React from "react";
import PropTypes from 'prop-types';

class Shelf extends React.Component {
    static propTypes = {
        shelfType: PropTypes.array.isRequired,
        moveTo: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
      }
    render() {
       const {shelfType, moveTo, title} = this.props;
        let selected = ''
       switch (title) {
           case "Currently Reading":
               selected = "currentlyReading"
               break;
           case "Want To Read":
               selected = "wantToRead"
               break;
           case "Read":
               selected = "read"
               break;
       
           default:
               break;
       }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {shelfType.map(book => {
                        return(
                            <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ 
                                        width: 128, 
                                        height: 193, 
                                        backgroundImage: book.imageLinks.thumbnail !== undefined ? `url(${book.imageLinks.thumbnail})`: '' }}></div>
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => moveTo(book, event.target.value)} defaultValue={selected}>
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
                                    return(
                                        <div key={index} className="book-authors">{ author }</div>
                                    )
                                }) }
                                
                            </div>
                        </li>
                        )
                    })}
                        
                    </ol>
                </div>
            </div>
        );
    }
    }
    

export default Shelf;