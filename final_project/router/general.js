const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

// Task 6 - Register a new user
public_users.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ username: username, password: password });
            return res.status(200).json({
                message: 'User successfully registred. Now you can login',
            });
        } else {
            return res.status(404).json({ message: 'User already exists!' });
        }
    }
    return res.status(404).json({ message: 'Unable to register user.' });
});

// Task 1 - Get the book list available in the shop
// public_users.get('/', function (req, res) {
//     res.send(JSON.stringify(books, null, 4));
// });

// Task 10 - Get the book list available in the shop using promise
public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        try {
            const data = books;
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
    getBooks.then(
        (data) => res.send(JSON.stringify(data, null, 4)),
        (err) => res.status(404).send('File not found')
    );
});

// Task 2 - Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     const isbn = req.params.isbn;
//     res.send(books[isbn]);
// });

// Task 11 - Get book details based on ISBN using promise
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBooks = new Promise((resolve, reject) => {
        try {
            const data = books[isbn];
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
    getBooks.then(
        (data) => res.send(JSON.stringify(data, null, 4)),
        (err) => res.status(404).send('File not found')
    );
});

// Task 3 - Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     const author = req.params.author;
//     const data = {};
//     for (const [key, value] of Object.entries(books)) {
//         console.log(`Testing ${author} = ${value.author}`);
//         if (author === value.author) {
//             data[`${key}`] = value;
//         }
//     }
//     res.send(JSON.stringify(data, null, 4));
// });

// Task 12 - Get book details base on author using promise
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const data = {};
    const getBookByAuthor = new Promise((resolve, reject) => {
        try {
            for (const [key, value] of Object.entries(books)) {
                if (author === value.author) {
                    data[`${key}`] = value;
                }
            }
            if (Object.keys(data).length > 0) resolve(data);
            else reject(err);
        } catch (err) {
            reject(err);
        }
    });
    getBookByAuthor.then(
        (data) => res.send(JSON.stringify(data, null, 4)),
        (err) => res.status(404).send('Author not found')
    );
});

// Task 4 - Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//     const title = req.params.title;
//     for (const book of Object.values(books)) {
//         if (title === book.title) {
//             res.send(book);
//         }
//     }
// });

// Task 13 - Get all books based on title using promise
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const data = {};
    const getBookByTitle = new Promise((resolve, reject) => {
        try {
            for (const [key, value] of Object.entries(books)) {
                if (title === value.title) {
                    data[`${key}`] = value;
                }
            }
            if (Object.keys(data).length > 0) resolve(data);
            else reject(err);
        } catch (err) {
            reject(err);
        }
    });
    getBookByTitle.then(
        (data) => res.send(JSON.stringify(data, null, 4)),
        (err) => res.status(404).send('Title not found')
    );
});

// Task 5 - Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
