let {
    DEV_SPRITE_PATH,
    DEV_SPRITE_CSS_PATH,
    SPRITES_PATH,
    ICONS_PATH,
    CSS_PATH
} = require('../constants/paths');
let {
    SPRITE_TEMPLATE_CSS_FILE
} = require('../constants/files');
let {
    BEGIN_CLEAN_TASK,
    CREATE_SPRITE_TASK,
    CREATE_PNG_COPY_TASK,
    COPY_SPRITE_GRAPHIC_TASK,
    COPY_SPRITE_CSS_TASK,
    END_CLEAN_TASK
} = require('../constants/subTasks');
let {ICONS_TASK} = require('../constants/mainTasks');
let gulp = require('gulp');
let svgSprite = require('gulp-svg-sprite');
let rename = require('gulp-rename');
let del = require('del');
let svg2png = require('gulp-svg2png');

let config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function(){
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: SPRITE_TEMPLATE_CSS_FILE
                }
            }
        }
    }
};

gulp.task(BEGIN_CLEAN_TASK, function(){
    return del([DEV_SPRITE_PATH, SPRITES_PATH]);
});

gulp.task(CREATE_SPRITE_TASK, [BEGIN_CLEAN_TASK], function(){
    return gulp.src(`${ICONS_PATH}/**/*.svg`)
        .pipe(svgSprite(config))
        .pipe(gulp.dest(DEV_SPRITE_PATH));
});

gulp.task(CREATE_PNG_COPY_TASK, [CREATE_SPRITE_TASK], function(){
    return gulp.src(`${DEV_SPRITE_CSS_PATH}/*.svg`)
        .pipe(svg2png())
        .pipe(gulp.dest(DEV_SPRITE_CSS_PATH));
});

gulp.task(COPY_SPRITE_GRAPHIC_TASK, [CREATE_PNG_COPY_TASK], function(){
    return gulp.src(`${DEV_SPRITE_CSS_PATH}/**/*.{svg,png}`)
        .pipe(gulp.dest(SPRITES_PATH));
});

gulp.task(COPY_SPRITE_CSS_TASK, [CREATE_SPRITE_TASK], function(){
    return gulp.src(`${DEV_SPRITE_CSS_PATH}/*.css`)
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest(CSS_PATH));
});

gulp.task(END_CLEAN_TASK, [COPY_SPRITE_GRAPHIC_TASK, COPY_SPRITE_CSS_TASK], function(){
    return del(SPRITES_PATH);
});

gulp.task(ICONS_TASK, [
    BEGIN_CLEAN_TASK,
    CREATE_SPRITE_TASK,
    CREATE_PNG_COPY_TASK,
    COPY_SPRITE_GRAPHIC_TASK,
    COPY_SPRITE_CSS_TASK,
    END_CLEAN_TASK
]);