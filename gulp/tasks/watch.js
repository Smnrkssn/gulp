let {
    DEV_CSS_PATH,
    DEV_SASS_PATH,
    DEV_JAVASCRIPT_PATH,
    XAMPP_PATH,
    GULP_TASK_PATH
} = require('../constants/paths');
let {SCRIPTS_REFRESH_TASK} = require('../constants/subTasks');
let {WEBPACK_TASK, WATCH_TASK, SASS_TASK} = require('../constants/mainTasks');
let gulp = require('gulp');
let watch = require('gulp-watch');
let browserSync = require('browser-sync').create();

gulp.task(WATCH_TASK, function(){
    let dirname = __dirname.startsWith(XAMPP_PATH) ?
        __dirname.replace(XAMPP_PATH, "").replace(GULP_TASK_PATH, "") : "";
    let host = (dirname !== "") ? `http://localhost${dirname}` : "http://localhost:3000";

    browserSync.init({
        proxy: host,
        online: true
    });
    
    watch('*.php', function(){
        browserSync.reload();
    });
    
    watch('*.html', function(){
        browserSync.reload();
    });
    
    watch(`${DEV_CSS_PATH}/**/*.css`, function(){
        browserSync.reload();
    });
    
    watch(`${DEV_SASS_PATH}/**/**/*.scss`, function(){
        gulp.start(SASS_TASK);
        browserSync.reload();
    });
    
    watch(`${DEV_JAVASCRIPT_PATH}/**/*.js`, function(){
        gulp.start(SCRIPTS_REFRESH_TASK);
        browserSync.reload();
    });
    
    watch(`${DEV_JAVASCRIPT_PATH}/**/*.jsx`, function(){
        gulp.start(SCRIPTS_REFRESH_TASK);
        browserSync.reload();
    });
});

gulp.task(SCRIPTS_REFRESH_TASK, [WEBPACK_TASK], function(){
    browserSync.reload();
});