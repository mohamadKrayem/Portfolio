
module.exports = {
  content:["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        "primary": "var(--mainBack-color)",
        "secondary": "var(--titles-color)",
        "third": "var(--amber-color)",
      },
      backgroundColor:{
        skin:{
          "primary": "var(--mainBack-color)",
          "third": "var(--amber-color)",
          "secondary": "var(--titles-color)",
          "fourth": "var(--nav-color)",
          "fifth": "var(--resume-color)",
        }
      },
      textColor:{
        skin:{
          "primary": "var(--mainBack-color)",
          "third": "var(--amber-color)",
          "secondary": "var(--titles-color)",
          "fourth": "var(--content-color)",
        }
      }
    },
  },
  plugins: [],
}