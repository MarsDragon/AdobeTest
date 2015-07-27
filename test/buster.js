var config = module.exports;

config["iterator tests"] = {
    rootPath: "../",
    environment: "browser", 
    sources: [
        "lib/*.js"
    ],
    tests: [
        "test/*-test.js"
    ],
	testbed: "test.html"
};