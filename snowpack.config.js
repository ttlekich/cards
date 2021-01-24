/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: { url: "/", static: true },
        src: { url: "/dist" },
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-postcss",
        "@snowpack/plugin-react-refresh",
        "@snowpack/plugin-dotenv",
    ],
};
