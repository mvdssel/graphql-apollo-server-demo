// databaseUtilities.js

// DEPENDENCIES
var { SQL_SERVER_HOST, SQL_SERVER_USER, SQL_SERVER_PASSWORD, SQL_SERVER_DATABASE } = process.env;
var { Connection } = require('tedious');  

// ENV VALIDATION
if( SQL_SERVER_HOST == null ||
    SQL_SERVER_USER == null ||
    SQL_SERVER_PASSWORD == null ||
    SQL_SERVER_DATABASE == null
) {
    throw 'Error while initialising database connection. Environment variables are not set.';
}

// SERVER CONFIG
var config = {  
    server: SQL_SERVER_HOST,                // update me
    authentication: {
        type: 'default',
        options: {
            userName: SQL_SERVER_USER,      // update me
            password: SQL_SERVER_PASSWORD   // update me
        }
    },
    options: {
        encrypt: true,                      // required for MS Azure
        database: SQL_SERVER_DATABASE,      // update me
        useColumnNames: true                // allows access by column name instead of column index
    }
};  

// Re-usable connection function
createConnection = () => {
    return new Connection(config);  
}

// MODULE EXPORT
(function() {
    var databaseUtilities = {
        createConnection: createConnection
    };

    module.exports = databaseUtilities;
}());

