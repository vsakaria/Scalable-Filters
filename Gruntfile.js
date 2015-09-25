module.exports = function (grunt) {
    grunt.initConfig({
        jasmine: {
            src: ['./app/**/*.js', '!./app/**/gameController.js', '!./app/main.js'],
            options: {
                specs: './specs/*spec.js',
                outfile: '_specRunner.html',
                keepRunner: true
            }
        },
        watch: {
            files: ['./app/**/*.js', '.app/templates/*.html'],
            tasks: ['browserify', 'exorcise']
        },
        browserify: {
            dev: {
                src: ['./app/main.js'],
                dest: 'build/bundle.js'
            },
            options: {
                transform: ['node-underscorify'],
                browserifyOptions: {
                    debug: true
                }
            }
        },
        exorcise: {
            bundle: {
                options: {},
                files: {
                    'build/bundle.map': ['build/bundle.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exorcise');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['browserify', 'exorcise']);
};
