module.exports = {
    theme: {
        extend: {
            transitionProperty: {
                height: "height",
                spacing: "margin, padding",
            },
        },
    },
    variants: {
        overflow: ["last"],
        translate: ["first"],
        transform: ["first"],
    },
};
