/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // Add your custom colors here
            // colors: {
            //     primary: '#050816',
            //     secondary: '#aaa6c3',
            //     tertiary: '#151030',
            //     'black-100': '#100d25',
            //     'black-200': '#090325',
            //     'white-100': '#f3f3f3',
            // },
        },
    },
    plugins: [],
}
