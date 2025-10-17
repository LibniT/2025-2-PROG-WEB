/** @type {import('tailwindcss').Config} */
export default {
content: [
'./index.html',
'./src/**/*.{js,jsx,ts,tsx}',
],
theme: {
extend: {
colors: {
primary: {
DEFAULT: '#2563eb', // azul botón
soft: '#e6f0ff',
},
ink: '#0f172a',
},
boxShadow: {
soft: '0 10px 40px rgba(15,23,42,.08)',
},
borderRadius: {
xl2: '1.25rem',
}
},
},
plugins: [],
}