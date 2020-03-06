// books.js

/*
 * DEPENDENCIES
 */
var { Request, TYPES } = require('tedious');  
var databaseUtilities = require('./databaseUtilities.js');

/*
 * CONSTANTS
 */
const GET_BOOKS_QUERY = `
    SELECT id, title, author_id
    FROM books
`;
const GET_BOOK_BY_ID_QUERY = `
    SELECT id, title, author_id
    FROM books
    WHERE books.id = @id;
`;
const GET_BOOK_BY_AUTHOR_QUERY = `
    SELECT id, title, author_id
    FROM books
    WHERE books.author_id = @authorId;
`;
const CREATE_BOOK_QUERY = `
    INSERT INTO books (title, author_id)
    OUTPUT INSERTED.id
    VALUES(@title, @authorId);
`;

/*
 * SCRIPT
 */
let getBooks = () => {
    var connection = databaseUtilities.createConnection();

    return new Promise((resolve, reject) => {
	// connect to db
	console.log("connecting to database");
	connection.on('connect', function(err) {  
	    // connection failed
	    if(err) {
		console.log("error while connecting to database");
		console.log(err);
		throw err;
	    }
	    // connection successful
	    else {
		// prepare resultset
		var books = [];

		// create request
		request = new Request(
		    GET_BOOKS_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while fetching book");
			    reject(err);
			}  
			else {
			    resolve(books);
			    connection.close();
			}
		    }
		);

		// create request handler
		request.on('row', (columns) => {  
		    // add book to resultset
		    var book = {
			id: columns.id.value,
			title: columns.title.value,
			authorId: columns.author_id.value
		    };

		    books.push(book);
		});  

		// execute request
		console.log("executing books query");
		connection.execSql(request);
	    }
	});  
    });  
}

let getBookById = (bookId) => {
    var connection = databaseUtilities.createConnection();

    return new Promise((resolve, reject) => {
	// connect to db
	console.log("connecting to database");
	connection.on('connect', function(err) {  
	    // connection failed
	    if(err) {
		console.log("error while connecting to database");
		console.log(err);
		throw err;
	    }
	    // connection successful
	    else {
		// prepare resultset
		var book = null;

		// create request
		request = new Request(
		    GET_BOOK_BY_ID_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while fetching book");
			    reject(err);
			}  
			else {
			    resolve(book);
			    connection.close();
			}
		    }
		);

		// add parameters
		request.addParameter('id', TYPES.Int, bookId);

		// create request handler
		request.on('row', (columns) => {  
		    // add book to resultset
		    book = {
			id: columns.id.value,
			title: columns.title.value,
			authorId: columns.author_id.value
		    };
		});  

		// execute request
		console.log("executing book query");
		connection.execSql(request);
	    }
	});  
    });  
}

let getBooksByAuthor = (authorId) => {
    var connection = databaseUtilities.createConnection();

    return new Promise((resolve, reject) => {
	// connect to db
	console.log("connecting to database");
	connection.on('connect', function(err) {  
	    // connection failed
	    if(err) {
		console.log("error while connecting to database");
		console.log(err);
		throw err;
	    }
	    // connection successful
	    else {
		// prepare resultset
		var books = [];

		// create request
		request = new Request(
		    GET_BOOK_BY_AUTHOR_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while fetching book");
			    reject(err);
			}  
			else {
			    resolve(books);
			    connection.close();
			}
		    }
		);

		// add parameters
		request.addParameter('authorId', TYPES.Int, authorId);

		// create request handler
		request.on('row', (columns) => {  
		    // add book to resultset
		    var book = {
			id: columns.id.value,
			title: columns.title.value,
			authorId: columns.author_id.value
		    };

		    books.push(book);
		});  

		// execute request
		console.log("executing book query");
		connection.execSql(request);
	    }
	});  
    });  
}

let createBook = (title, authorId) => {
    var connection = databaseUtilities.createConnection();

    return new Promise((resolve, reject) => {
	// connect to db
	console.log("connecting to database");
	connection.on('connect', function(err) {  
	    // connection failed
	    if(err) {
		console.log("error while connecting to database");
		console.log(err);
		throw err;
	    }
	    // connection successful
	    else {
		// prepare resultset
		var bookId = null;

		// create request
		request = new Request(
		    CREATE_BOOK_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while inserting book");
			    reject(err);
			}  
			else {
			    resolve(bookId);
			    connection.close();
			}
		    }
		);

		// add parameters
		request.addParameter('title', TYPES.NChar, title);
		request.addParameter('authorId', TYPES.Int, authorId);

		// create request handler
		request.on('row', (columns) => {  
		    // add book to resultset
		    bookId = columns.id.value;
		});  

		// execute request
		console.log("executing book insert");
		connection.execSql(request);
	    }
	});  
    });  
}


(function() {
    module.exports = {
	getBooks,
	getBookById,
	getBooksByAuthor,
	createBook
    };
}());
