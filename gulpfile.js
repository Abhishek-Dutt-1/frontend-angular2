var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rollup     = require('gulp-rollup');
var SystemBuilder = require('systemjs-builder');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');
var embedTemplates = require('gulp-angular-embed-templates');
var clean = require('gulp-clean');


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('dist', ['bundlelib', 'bundlecss', 'bundlefonts', 'compress'], function() {
  console.log("Success: Dist files in /dist");
});

// Clean
gulp.task('clean', function () {
	return gulp.src(['build', 'dist'], {read: false})
		.pipe(clean());
});

// Vendor
gulp.task('bundlelib', function () {
  return gulp.src([
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/jquery/dist/jquery.min.js',
    //'node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
    .pipe(uglify())
    //.pipe(rollup({sourceMap: false}))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist'));
});

// CSS
gulp.task('bundlecss', function () {
  return gulp.src([
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'styles.css'])
    .pipe(concatCss('styles.min.css'))
    .pipe(gulp.dest('dist/dist/css'));
});

// Fonts
gulp.task('bundlefonts', function() {
    return Promise.all([
      gulp.src(['node_modules/font-awesome/fonts/*']).pipe(gulp.dest('dist/dist/fonts')),
      gulp.src(['node_modules/bootstrap/dist/fonts/*']).pipe(gulp.dest('dist/bootstrap/dist/fonts'))
    ]);
});

// Compile TS into individual js files
gulp.task('tscompile', function () {
    var tsResult = gulp.src('app/**/*.ts')
        .pipe(embedTemplates({sourceType:'ts', basePath: '.'})) // inline templates
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
        //.pipe(rollup({entry: 'build/main.js'}))
        //.pipe(gulp.dest('build/rollup'));
});

/*
// This works but excludes angular and rxjs
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
*/


/**
 * Add angualr and app js files into a bundle
 */
gulp.task('bundle2', ['tscompile'], function () {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'build', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var paths = {
      'build/*': 'build/*.js',
      //"angular2-jwt": "node_modules/angular2-jwt/angular2-jwt.js"
  }
  var meta =  {
      '@angular/*': {
          build: false
      },
      'rxjs/*': {
          build: false
      }
  }

  var config = {
    map: map,
    packages: packages,
    paths: paths
  }

    var builder = new SystemBuilder( './', config );

    //return builder.bundle('build/main', 'build/app.bundle.js');
    //return builder.buildStatic('build/main', 'build/app.bundle.js', { format: 'cjs' });     // this would require resp module loader
    return builder.buildStatic('build/main', 'build/app.min.js');    // SFX builds should be loaded at the end in index.html
});


gulp.task('compress', ['bundle2'], function() {
  return gulp.src('build/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
