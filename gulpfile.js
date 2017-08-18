var gulp = require('gulp');
var less = require('gulp-less');
var mincss = require('gulp-csso');

// 任务一：处理css

gulp.task('css',function(){
	
	return gulp.src('./less/*.less')  //获取less/目录下所有的Less文件
		.pipe(less())		// 将Less文件编译成css文件
		.pipe(mincss())			//压缩css
		.pipe(gulp.dest('./css/'))
		.pipe(reload({stream:true}));

});

//任务二：压缩HTML文件

var htmlmin = require('gulp-htmlmin');

gulp.task('html',function(){

	return gulp.src('./htmls/*.html')
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest('./'))
		.pipe(reload({stream: true}));
});

//任务三：处理JS文件，压缩混淆

var uglify = require('gulp-uglify');

gulp.task('js',function(){

	return gulp.src('./scripts/*.js')

		.pipe(uglify())
		.pipe(gulp.dest('./js/'))
		.pipe(reload({stream: true}));
});


// 任务四：把我们的代码放到一个静态服务器中，
// 当我们的HTML文件改变时，刷新浏览器
// 当我们的JS或CSS改变时，把他们编译或混淆压缩后的代码注入到我们的浏览器


var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve',['css','html','js'], function(){

	browserSync.init({

		server: './'

	});

	//监视Less文件的变化
	
	gulp.watch('./less/*.less',['css']);

	//监视HTML文件的改变

	gulp.watch('./htmls/*.html',['html']);

	//监视js文件的改变

	gulp.watch('./scripts/*.js',['js']);

});

//定义一个默认的任务，当我们调用gulp任务的时候，如果不写任务名称，则调用默认的任务

gulp.task('default',['serve']);