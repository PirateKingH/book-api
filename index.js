const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

let books = []; // In-memory array to store books

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  const index = books.findIndex(book => book.id == bookId);
  if (index !== -1) {
    books[index] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  books = books.filter(book => book.id != bookId);
  res.json({ message: 'Book deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
