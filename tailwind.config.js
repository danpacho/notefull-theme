/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            listStyleType: {
                none: "none",
                ["circle-filled"]: "disc",
                circle: "circle",
                square: "square",
                decimal: "decimal",
                roman: "upper-roman",
                ["lower-alpha"]: "lower-alpha",
                ["upper-alpha"]: "upper-alpha",
            },
        },
    },
    plugins: [],
    darkMode: "class",
}
