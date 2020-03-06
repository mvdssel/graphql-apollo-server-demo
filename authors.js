// authors.js

/*
 * DEPENDENCIES
 */
var { Request, TYPES } = require('tedious');  
var { findIndex } = require('lodash');
var databaseUtilities = require('./databaseUtilities.js');

/*
 * CONSTANTS
 */
const GET_AUTHORS_QUERY = `
    SELECT id, name
    FROM authors
`;
const GET_AUTHOR_BY_ID_QUERY = `
    SELECT id, name
    FROM authors
    WHERE id = @id;
`;
const CREATE_AUTHOR_QUERY = `
    INSERT INTO authors (name)
    OUTPUT INSERTED.id
    VALUES(@name);
`;

/*
 * SCRIPT
 */
let getAuthors = () => {
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
		var authors = [];

		// create request
		request = new Request(
		    GET_AUTHORS_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while fetching authors");
			    reject(err);
			}  
			else {
			    resolve(authors);
			    connection.close();
			}
		    }
		);

		// create request handler
		request.on('row', (columns) => {  
		    // add author to resultset
		    var author = {
			id: columns.id.value,
			name: columns.name.value
		    };
		    authors.push(author);  
		});

		// execute request
		console.log("executing authors query");
		connection.execSql(request);
	    }
	});  
    });  
}

let getAuthorById = (authorId) => {
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
		var author = null;

		// create request
		request = new Request(
		    GET_AUTHOR_BY_ID_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while fetching author");
			    reject(err);
			}  
			else {
			    resolve(author);
			    connection.close();
			}
		    }
		);

		// add parameters
		request.addParameter('id', TYPES.Int, authorId);

		// create request handler
		request.on('row', (columns) => {  
		    // add author to resultset
		    author = {
			id: columns.id.value,
			name: columns.name.value
		    };
		});

		// execute request
		console.log("executing author query");
		connection.execSql(request);
	    }
	});  
    });  
}

let createAuthor = (name) => {
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
		var authorId = null;

		// create request
		request = new Request(
		    CREATE_AUTHOR_QUERY,
		    (err) => {  
			if (err) {  
			    console.log("error while inserting author");
			    reject(err);
			}  
			else {
			    resolve(authorId);
			    connection.close();
			}
		    }
		);

		// add parameters
		request.addParameter('name', TYPES.NChar, name);

		// create request handler
		request.on('row', (columns) => {  
		    // add book to resultset
		    authorId = columns.id.value;
		});  

		// execute request
		console.log("executing author insert");
		connection.execSql(request);
	    }
	});  
    });  
}


(function() {
    module.exports = {
	getAuthors,
	getAuthorById,
	createAuthor
    };
}());
