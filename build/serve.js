var gulp = require("gulp"),
    globals = require("./_globals.js"),
    productionFn = function() {
        var exec = require("child_process").exec,
            shell = exec("node --use-strict ./dist/server.js --prod");

        shell.stdout.on("data", function(data) {
            console.log(data);
        });
    },
    developmentFn = function() {
        var watch = require("gulp-watch"),
            liveServer = require("gulp-live-server"),
            serverPath = "./dist/server.js",
            server = liveServer(["--use-strict", serverPath]);

        server.start();

        //restart server when changes are detected
        gulp.watch(["./dist/public/**/*.{html,css,png,js}", "./src/app/**/*.js"], function (file) {
            server.notify.apply(server, [file]);
        });
        gulp.watch(serverPath, server.start.bind(server));

        //add watches for application
        gulp.watch("./src/public/**/*.{html,css,png}", ["replace"]);
        gulp.watch(["./src/**/*.html", "!./src/public/**/*.html"], ["ngTemplates"]);
    };

gulp.task("start-server", function() {

    return globals.isProduction ? productionFn() : developmentFn();
});