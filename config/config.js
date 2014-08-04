var path = require('path'),
    fs   = require('fs'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'logical-quiz'
    },
    port: 3000,
    db: 'mongodb://localhost/logical-quiz-development',
    pkg: JSON.parse( fs.readFileSync( "package.json" ) )
  },

  test: {
    root: rootPath,
    app: {
      name: 'logical-quiz'
    },
    port: 3000,
    db: 'mongodb://localhost/logical-quiz-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'logical-quiz'
    },
    port: 3000,
    db: 'mongodb://localhost/logical-quiz-production'
    
  }
};

module.exports = config[env];
