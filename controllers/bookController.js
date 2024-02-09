const Book = require('../models/book');
const { bookValidation } = require('../validators/bookValidation');
const { putValidation } = require('../validators/putValidation');


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const responseBooks = books.map(book => mapBookToResponse(book));
    res.json(responseBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getBook = async (req, res) => {
  try {

    // Find the book by ID
    const curBook = await Book.findOne({ id: req.params.bookId });


    // Check if book was found
    if (!curBook) {
      return res.status(404).json({ message: `book with id: ${req.params.bookId} was not found` });
    }

    const responseBook = mapBookToResponse(curBook);

    res.json(responseBook);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// exports.deleteBook = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.bookId);
//     if (book == null) {
//       return res.status(404).json({ message: 'Cannot find book' });
//     }
//     await Book.deleteOne({ _id: req.params.bookId });
//     res.json({ message: 'Deleted book' });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

exports.updateBook = async (req, res) => {
  try {
    // Validate request body
    const { error } = putValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Find the book by ID
    const curBook = await Book.find({ id: req.params.bookId });


    // Check if book was found
    if (!curBook || curBook.length === 0) {
      return res.status(404).json({ message: `book with id: ${req.params.bookId} was not found` });
    }

    curBook[0].set(req.body);

    // Save the updated book
    const updatedBook = await curBook[0].save();
    const responseBook =  mapBookToResponse(updatedBook);

    res.json(responseBook);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




exports.addBook = async (req, res) => {
  try {
    // Validate request body
    const { error } = bookValidation(req.body);
    if (error) return res.status(400).json({ message: error });

    // Create a new book object based on request body
    const newBook = new Book({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price
      // Add more fields as needed
    });

    // Save the new book to the database
    const savedBook = await newBook.save();
    const responseBook = mapBookToResponse(savedBook);


    // Respond with the modified book object and 201 status
    res.status(201).json(responseBook);


    // Respond with the saved book object and 201 status
    // res.status(201).json(savedBook);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    let query = {};

    // Check if search field is provided in the query parameters
    if (req.query.title) {
      query.title = req.query.title;
    } 
    else if (req.query.author) {
      query.author = req.query.author;
    } 
    else if (req.query.genre) {
      query.genre = req.query.genre;
    }

    let sortField = 'id'; // Default sorting field
    let sortOrder = 1; // Default sorting order

    // Check if sorting field is provided in the query parameters
    if (req.query.sort) {
      sortField = req.query.sort;
    }

    // Check if sorting order is provided in the query parameters
    if (req.query.order && req.query.order.toUpperCase() === 'DESC') {
      sortOrder = -1;
    }

    // Fetch books based on search criteria and sort them accordingly
    const books = await Book.find(query).sort({ [sortField]: sortOrder });

    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const mapBookToResponse = (book) => {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price
  };
};
