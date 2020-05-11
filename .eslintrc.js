module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/max-attributes-per-line": [2, {singleline: 10}],
    "vue/component-name-in-template-casing": [0, "kebab-case"],
    "vue/html-self-closing": [0, {svg: "never"}],
    "function-paren-newline": ["error", "consistent"],
    "quote": ["single", 1]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["vue"],
  globals: {
    $: true,
    google: true,
    Stripe: true,
    FB: true,
  },
};
