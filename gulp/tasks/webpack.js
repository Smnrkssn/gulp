let {WEBPACK_CONFIG_FILE} = require('../constants/files');
let {WEBPACK_TASK} = require('../constants/mainTasks');
let gulp = require('gulp');
let webpack = require('webpack');

gulp.task(WEBPACK_TASK, function(callback){
    webpack(require(WEBPACK_CONFIG_FILE), function(err, stats){
        if(err){
            console.log(err.toString());
        }
        
        console.log(stats.toString());
        callback();
    });
});