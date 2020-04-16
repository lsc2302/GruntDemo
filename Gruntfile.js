module.exports = function(grunt){
    grunt.initConfig({
        concat:{
            options:{
                separator:';'
            },
            dist:{
                src:['src/js/*.js'],
                dest:'build/js/build.js'
            }
        },
        pkg:grunt.file.readJSON('package.json'),
        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */'
              },
              my_target: {
                files: {
                    'build/js/build.min.js': ['build/js/build.js']
                }
              }
        },
        jshint:{
            options:{
                jshintrc:'.jshintrc'
            },
            build:['Gruntfile.js','src/js/*.js']
        },
        cssmin:{
            options:{
                shorthandCompacting:false,
                roundingPrecision:-1,
            },
            build:{
                files:{
                    'build/css/build.min.css':['src/css/*.css']
                }
            }
        },
        htmlmin:{
            firstTarget:{
                options:{
                    removeComments: true,
                    collapseWhitespace:true
                },
                files:{
                    "build/index.html":"src/index.html"
                }
            }
        },
        watch:{
            scripts:{
                files:['src/js/*.js','src/css/*.css'],
                tasks:['concat','jshint','uglify','cssmin'],
                options:{spam:false}
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['concat','uglify','jshint','cssmin','htmlmin']);
    grunt.registerTask('myWatch',['default','watch']);
};