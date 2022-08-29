const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                // 🚀 VSCODE_AUTO_COMPLETE 🚀
                ".description_text": {},
                ".heading_text": {},
                ".layout": {},
            })
        }),
    ],
}
