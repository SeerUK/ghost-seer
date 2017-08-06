"use strict";

module.exports = function(env) {
    return {
        plugins: {
            autoprefixer: {
                browsers: [
                    "last 2 versions",
                    "ie >= 9",
                    "iOS >= 8"
                ]
            }
        }
    };
};
