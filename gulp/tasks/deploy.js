let {
    ROOT_PATH,
    IMAGES_PATH,
    ICONS_PATH
} = require('../constants/paths');
let {HTML_FILE} = require('../constants/files');
let {DEPLOY_TASK} = require('../constants/mainTasks');
let {OPTIMIZE_IMAGES_TASK, USEMIN_TASK} = require('../constants/subTasks');
let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let usemin = require('gulp-usemin');

gulp.task(OPTIMIZE_IMAGES_TASK, function(){
    return gulp.src([`${IMAGES_PATH}/**/*`, `!${ICONS_PATH}`, `!${ICONS_PATH}/**/*`])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest(IMAGES_PATH));
});

gulp.task(USEMIN_TASK, function(){
    return gulp.src(`${ROOT_PATH}/${HTML_FILE}`)
        .pipe(usemin())
        .pipe(gulp.dest(`${ROOT_PATH}/`));
});

gulp.task(DEPLOY_TASK, [
    OPTIMIZE_IMAGES_TASK,
    USEMIN_TASK
]);