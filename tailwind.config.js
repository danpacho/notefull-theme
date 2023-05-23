/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./blog.config.ts", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
    darkMode: "class",
    plugins: [],
}
