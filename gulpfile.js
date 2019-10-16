const gulp = require ( 'gulp' ) ;
const gulpScss = require ( 'gulp-sass' ) ;
const removeFiles = require ( 'gulp-remove-files' ) ;
const connect = require ( 'gulp-connect' ) ;
const babel = require ( 'gulp-babel' ) ;

gulp.task ( 'clear', done => {
	gulp.src ('./dist/*')
		.pipe ( removeFiles ( ) );
	done ( ) ;
})

gulp.task ( 'styles', done => {
	gulp.src ( './app/sass/style.scss' )
		.pipe ( gulpScss ( ) )
		.pipe ( gulp.dest ( './app/dist' ) )
	done ( ) ;
});

gulp.task ( 'connect', done => {
	connect.server ( {  
		root: ['app'], 
		port: 8080,  
		keepalive: true,  
		open: { browser: 'chrome' },
		livereload:true
	} ) 
	done ( ) ;
} ) ;

gulp.task ( 'babel', done => {
	gulp.src ( './app/js/script.js' )
        .pipe(babel({
            presets: [['@babel/preset-env']]
        }))
        .pipe ( gulp.dest ( './dist' ) )
	done ( ) ;
} ) ;

gulp.task ( 'watch', ( ) => {
	gulp.watch ( 'app/sass/style.scss', gulp.series ( 'styles' ) ) ;
	gulp.watch ( 'app/js/script.js', gulp.series ( 'babel' ) ) ;
})
gulp.task ( 'default' , gulp.series ('connect', 'clear','styles', 'babel', 'watch') ) ;