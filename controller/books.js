const Book = require('../models/book');
const createBook = async (req, res) => {
    const { bookName, authorName, price } = req.body;

    try {
        
        const existingBook = await Book.findOne({ bookName });

        if (existingBook) {
            // A book with the same name already exists
            res.status(400).json({ message: "A book with the same name already exists" });
        } else {
  
            const newBook = new Book({
                bookName,
                authorName,
                price,
            });

            const savedBook = await newBook.save();

         
            res.status(201).json(savedBook);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Could not create a new book due to internal error' });
    }
};

const updateBook = async (req, res) => {
    const { bookName, payLoad } = req.body;

    try {
        const book = await Book.findOne({ bookName });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the book's data based on the payLoad
        if (payLoad.bookName) {
            book.bookName = payLoad.bookName;
        }
        if (payLoad.authorName) {
            book.authorName = payLoad.authorName;
        }
        if (payLoad.price) {
            book.price = payLoad.price;
        }

        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update book due to internal error' });
    }
};



const deleteBook = async (req, res) => {
    const { bookName } = req.body;

    try {
        const deletedBook = await Book.findOneAndDelete({ bookName });

        if (!deletedBook) {
            res.status(404).json({ message: "Book not found" });
        } else {
            res.status(204).json({message:"deleted successfully"}); 
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error" });
    }
};


const getBooks = async (req,res)=>{
    try{
        const data = await Book.find();
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json({message:"failed to load books"});
    }
}

module.exports = {
    getBooks,
    deleteBook,
    updateBook,
    createBook
}