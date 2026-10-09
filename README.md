I made this website for my Aunt, who runs a preschool. It's a static page that contains information about the school and what they teach, as well as how to contact her.

This is one of the first pages I made, and I think the later ones are better, but I'm leaving this up in case anyone wants to look at it.

## Local development

Use Node.js 20.19.0 or newer.

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:8080/ to preview the static site. Stop the server with Ctrl+C.
Run `npm start` in another terminal to watch `sass/mystyles.scss` and rebuild
`css/mystyles.css` as you edit. Refresh the browser after changes.

The stylesheet uses Bulma 1 and Dart Sass. Its `.scss` extension matches the
existing brace-and-semicolon syntax. Pages explicitly use the light theme to
preserve the site's colors. The generated `css/mystyles.css` is committed so
GitHub Pages can serve the site without a build step.

The obsolete `secret-build` script was removed because its source stylesheet
does not exist in this repository.
