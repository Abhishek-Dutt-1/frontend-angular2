var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});


var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');
var embedTemplates = require('gulp-angular-embed-templates');

gulp.task('tscompile', function () {
    var tsResult = gulp.src('app/**/*.ts')
        //.pipe(embedTemplates({sourceType:'ts', basePath: '.'})) // inline templates
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(gulp.dest('build/'));
});


var SystemBuilder = require('systemjs-builder');
gulp.task('bundle', ['tscompile'], function () {
    var builder = new SystemBuilder('./', {
        paths: {
            '*': '*.js',
            //"angular2-jwt": "node_modules/angular2-jwt/angular2-jwt.js"
        },
        meta: {
            '@angular/*': {
                build: false
            },
            'rxjs/*': {
                build: false
            }
        }
    });

    return builder.bundle('build/main', 'build/app.bundle.js');
    //return builder.buildStatic('build/main', 'build/app.bundle.js', { format: 'cjs' });
});
