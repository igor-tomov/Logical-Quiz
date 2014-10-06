var NODE_ENV     = process.env.NODE_ENV || "development";
var EventEmitter = require('events').EventEmitter;

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt, {scope: NODE_ENV != "development" ? "dependencies" : null});

  var reloadPort = 35729, files;

  // config for Front-end components
  var componentConfig = {
      js: {
          path: "public/js/components",
          files: [ "<%= name %>/", "<%= name %>/main.js", "<%= name %>/actions/", "<%= name %>/views/" ],

          template:   "/**\n" +
                      " * <Component description>\n" +
                      " */\n" +
                      "define( [], function(){\n" +
                      "    'use strict';\n" +
                      "    return {\n" +
                      "        initialize: function(){\n" +
                      "            // Lets Go...\n" +
                      "        }\n" +
                      "}});"
      },

      styles: {
          path: "public/styles/less/components",
          files: [ "<%= name %>.less" ],

          indexFile: "public/styles/less/index.less"
      },

      images: {
          path: "public/img/components",
          files: [ "<%= name %>/" ]
      }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },

    less: {
        dist: {
            options:{
                paths: ["public/styles"]
            },

            files: {
                "public/styles/css/dist.<%= pkg.version %>.css": "public/styles/less/index.less"
            }
        }
    },

    requirejs: {
        compile: {
            options: {
                baseUrl: "public/",
                //mainConfigFile: "public/js/main.js",
                name: "js/main",
                out: "public/js/build/dist.<%= pkg.version %>.js"
            }
        }
    },

    cssmin: {
        dist: {
            files: {
                "public/styles/css/dist.<%= pkg.version %>.min.css": "public/styles/css/dist.<%= pkg.version %>.css"
            }
        }
    },

    react: {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: "public/js/components",
                    src: [ "*/views/*.jsx" ],
                    dest: "public/js/components",
                    ext: ".js"
                }
            ]
        }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },

      js_front: {
          files: "public/js/**/*.js"
      },

      react:{
          files: "public/js/components/*/views/*.jsx",
          tasks: [ "react:dist" ]
      },

      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ]
      },

      styles: {
          files: "public/styles/less/**/*.less",
          tasks: [ "less:dist" ]
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var request = require('request');
    var done    = this.async();

    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask( "component", "Create boilerplate Front-end component, syntax: grunt component:<action>:<name>",function( action, name ){

      if ( ! name ){
          grunt.log.fail( "'name' argument is not supplied" );
          return false;
      }

      var config  = componentConfig,
          args    = process.argv.slice( 3 ),
          skipArg = "--skip-%s",
          type, item;


      function inherit( Child, Parent ){
          var proxy = function(){};

          proxy.prototype = Parent.prototype;
          Child.prototype = new proxy();

          Child.prototype.constructor = Child;
          Child.superclass  = Parent;
      }


      function BaseComponentItem( name, config ){
          // check path exists
          if ( ! grunt.file.exists( config.path ) ){
              throw new Error( 'Path "' + config.path + '" does not exist' );
          }

          // save item name
          this.name = name;

          // create "Event Emitter" instance
          this._eventEmitter = new EventEmitter;

          // save config data
          this._path  = config.path.replace( /\/$/, "" ) + "/";
          this._files = Array.isArray( config.files ) ? config.files : [config.files];
      }

      /**
       * Base component item, encapsulates common logic
       */
      BaseComponentItem.prototype = {
          constructor: BaseComponentItem,

          create: function(){
              var path    = this._path,
                  emitter = this._eventEmitter;

              this._files.forEach(function( target ){
                  target = path + grunt.template.process( target, {data: {name: name}} );

                  if ( grunt.file.exists( target ) ){
                      grunt.log.fail( '"' + target + '" is already exists' );
                      return;
                  }

                  if ( target.search( /\/$/ ) === -1 ){
                      // file
                      grunt.file.write( target, "" );
                  }else{
                      // dir
                      grunt.file.mkdir( target.replace( /\/$/, "" ) );
                  }

                  // notify observers
                  emitter.emit( "file:created", target );

                  // CLI notification
                  grunt.log.ok( '"' + target + '" created' );
              });
          },

          remove: function(){
              var path    = this._path,
                  emitter = this._eventEmitter;

              this._files.forEach(function(target){
                  target = path + grunt.template.process( target, {data: {name: name}} );

                  if ( grunt.file.exists( target ) ){
                      grunt.file.delete( target );

                      // notify observers
                      emitter.emit( "file:removed", target );

                      // CLI notification
                      grunt.log.ok( '"' + target + '" removed' );
                  }
              });
          }
      };

      /**
       * JavaScript component item
       */
      function JSComponentItem( name, config ){
          this.constructor.superclass.call( this, name, config );
          this._template = config.template;
      }

      inherit( JSComponentItem, BaseComponentItem );

      JSComponentItem.prototype.create = function(){
          var template = this._template;

          /**
           * Put boilerplate code to "main.js"
           * @param {String} filename
           */
          function putTemplate( filename ){
              if ( filename.search( /main.js$/ ) !== -1 ){
                  grunt.file.write( filename, template );
              }
          }

          this._eventEmitter.on( "file:created", putTemplate );
          this.constructor.superclass.prototype.create.call( this );
          this._eventEmitter.removeListener( "file:created", putTemplate );
      };

      /**
       * Style component item
       */
      function StyleComponentItem( name, config ){
          this.constructor.superclass.call( this, name, config );

          this._includeLine = this.includeLine.replace( "%s", name );

          // read style index file
          if ( grunt.file.exists( config.indexFile ) ){
              this._indexContent = grunt.file.read( config.indexFile ).split( /\r?\n/ );
              this._indexFile    = config.indexFile;
          }else{
              throw new Error( 'Style index file "' + config.indexFile + '" is not found' );
          }
      }

      inherit( StyleComponentItem, BaseComponentItem );

      StyleComponentItem.prototype.includeLine = "@import (less) 'components/%s.less';";
      StyleComponentItem.prototype.endPointString = '/** END: Components style */';


      StyleComponentItem.prototype.create = function(){
          this.constructor.superclass.prototype.create.call( this );
          this.attach();
      };

      StyleComponentItem.prototype.remove = function(){
          this.constructor.superclass.prototype.remove.call( this );
          this.detach();
      };

      StyleComponentItem.prototype.save = function(){
          grunt.file.write( this._indexFile, this._indexContent.join( "\n" ) );
      };

      StyleComponentItem.prototype.isAttached = function(){
          var pos = this._indexContent.indexOf( this._includeLine );
          return pos === -1 ? false : pos;
      };

      StyleComponentItem.prototype.attach = function(){
          var pos = this.isAttached(),
              endPoint;

          if ( pos === false ){
              endPoint = this._indexContent.indexOf( this.endPointString );
              if ( endPoint !== -1 ){
                  this._indexContent.splice( endPoint, null, this._includeLine );
                  this.save();

                  grunt.log.ok( '"' + this.name + '.less" is attached to "' + this._indexFile + '"' );
              }
          }
      };

      StyleComponentItem.prototype.detach = function(){
          var pos = this.isAttached();

          if ( pos !== false ){
              this._indexContent.splice( pos, 1 );
              this.save();

              grunt.log.ok( '"' + this.name + '.less" is detached from "' + this._indexFile + '"' );
          }
      };

      /**
       * Component item factory
       */
      function ComponentItemFactory( type, config ){
          //return componentItem;
          var Constructor;

          switch ( type ){
              case "js":
                  Constructor = JSComponentItem;
                  break;

              case "styles":
                  Constructor = StyleComponentItem;
                  break;

              default:
                  Constructor = BaseComponentItem;
          }

          return new Constructor( name, config );
      }

      // iterate config data
      for ( type in config ){
          if ( config.hasOwnProperty( type ) ){

              // check "skip" argument
              if ( args.indexOf( skipArg.replace( "%s", type ) ) !== -1 ){
                  continue;
              }

              // fetch appropriate component item
              item = ComponentItemFactory( type, config[type] );

              switch( action ){
                  case "create":
                      item.create();
                      break;

                  case "remove":
                      item.remove();
                      break;

                  default:
                      grunt.log.fail( "Unrecognized 'action' argument" );
                      return false;
              }
          }
      }

      // Result notification
      grunt.log.subhead( grunt.template.process( 'Component "<%= name %>" is <%= action%>d', {
              data:{
                  name: name,
                  action: action
              }}
      ));
  });

  grunt.registerTask('live-server', ['less:dist', 'react:dist', 'develop', 'watch']);
  grunt.registerTask('prod', ['less:dist', 'react:dist', 'requirejs', 'cssmin:dist']);
};
