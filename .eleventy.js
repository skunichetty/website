const navPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
    // Load the navigation plugin
    eleventyConfig.addPlugin(navPlugin);

    // Make sure to include css and img folder
    eleventyConfig.addPassthroughCopy("src/static/img");
    eleventyConfig.addPassthroughCopy("src/static/fonts");

    // Watch scss folder for updates
    eleventyConfig.addWatchTarget("src/static/scss");
    eleventyConfig.addWatchTarget("src/static/js");
    return {
        dir: {
            input: "src",
            includes: "_components",
            layouts: "_layouts",
            output: "dist",
        },
        templateFormats: ["njk", "md"],
    };
};
