# Node Express Localisation

Simple [Express](https://expressjs.com/) web HTML application using [i18n](https://www.npmjs.com/package/i18n) for displaying translated text strings based on request header locale.

## Requires

* [Node](https://nodejs.org/en/)

## Run

```
npm install

# available http://localhost:3000
npm start
```

## Notes

i18n is attached to Express app in `app.js` by middleware:

```
// Set locale for translations
i18n.configure({
  locales: ['en', 'cy'],
  directory: path.join(__dirname, '/locales'),
  updateFiles: process.env.I18N_UPDATEFILES || true
})
app.use(i18n.init)
```

When `updateFiles` is true, any use of the global `res.__('Translate this text')` will cause a new line to be added to `app/locales/en.json` for the english localisation (for context).

The global translate function is available in the templates:

```
<h1>{{ __(title) }}</h1>
```

Dynamic content can be added in route (e.g. for validation messages) or in template using formatted strings. There is also support for pluralisation/gender formatting. See (i18n docs)[https://www.npmjs.com/package/i18n] or (messageformat)[https://messageformat.github.io/] for details.

```
var msg1 = res.__mf('Hello {name}', { name: 'Marcus' }) // --> Hallo Marcus
```