import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
const app = express(),
            // eslint-disable-next-line no-undef
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App listening to ${PORT}....`)
  // eslint-disable-next-line no-undef
  console.log('Press Ctrl+C to quit.')
})
