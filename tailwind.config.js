/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx,css,html}'],
    theme: {
        extend: {
            screens: {
                sm: '480px',
                md: '976px',
                lg: '1220px',
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
            },
            fontFamily: {
                peyda: 'Peyda',
                yekanX: 'IRANYekanX',
            },

            colors: {
                'sc-red-normal': '#FF0000',
                'sc-gray-normal': '#959EA6',
                'sc-blue-normal': '#03045E',
                'sc-green-normal': '#1C7337',
                'sc-orange-normal': '#E18E01',
                'sc-purple-normal': '#EBEFFB',

                'sc-purple-100': '#FAFBFD',
                'sc-purple-400': '#6F6F9D',

                'sc-gray': '#F6F9FF',
                'sc-gray-100': ' #f4f6fa',
                'sc-green-100': '#F0FDF4',

                'sc-blue-800': '#020347',

                'sc-red-200': '#FFE7DB',
                'sc-red-600': '#bf0000',
                'sc-red-900': '#990000',

                'sc-brown-500': '#FFEAC7',
                'sc-brown-800': '#7C5109',
            },
        },
    },
    plugins: [],
};
