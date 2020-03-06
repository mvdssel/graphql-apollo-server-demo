// resolvers.js 

var merge = require('lodash/merge');
var books_library = require('./books.js');
var authors_library = require('./authors.js');


(function() {
    var resolvers = {
	// Queries
	Query: {
	    books: books_library.getBooks,
	    book: (root, args, context, info) => {
		return books_library.getBookById(args.id);
	    },

	    authors: authors_library.getAuthors,
	    author: (root, args, context, info) => {
		return authors_library.getAuthorById(args.id);
	    }
	},
	Book: { 
	    author(book) {
		return authors_library.getAuthorById(book.authorId);
	    }
	},
	Author: { 
	    books(author) {
		return books_library.getBooksByAuthor(author.id);
	    }
	},

	// Mutations
	Mutation: {
	    createBook: (root, args, context, info) => {
		return books_library.createBook(args.title, args.authorId);
	    },

	    createAuthor: (root, args, context, info) => {
		return authors_library.createAuthor(args.name);
	    }
	}
    };

    module.exports = resolvers;
}());

