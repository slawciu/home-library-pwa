import React, { useState } from 'react';
import Book from './Book';
import booksData from './data/books';
import './App.css';

function App() {
  const [books, setBooks] = useState(booksData)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Biblioteka Morisków
        </p>
      </header>
      <div>
        Książki
        {books.map(item => (
          <Book key={item.id} book={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
