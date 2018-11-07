let {
    DEV_SASS_PATH,
    CSS_PATH
} = require('../constants/paths');
let {
    SASS_FILE
} = require('../constants/files');
let {SASS_TASK} = require('../constants/mainTasks');
let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task(SASS_TASK, function(){
    return gulp.src(`${DEV_SASS_PATH}/${SASS_FILE}`)
        .pipe(sass({
            indentedSyntax: true,
            indentWidth: 4,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest(CSS_PATH));
});