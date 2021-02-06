/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: { url: "/", static: true },
        src: { url: "/dist" },
    },
    optimize: {
        bundle: true,
        minify: true,
        target: "es2018",
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-postcss",
        "@snowpack/plugin-react-refresh",
        "@snowpack/plugin-dotenv",
    ],
    routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
};
