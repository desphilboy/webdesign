# browser-sync-webpack

![Last version](https://img.shields.io/github/tag/Kikobeats/browser-sync-webpack.svg?style=flat-square)
[![Dependency status](https://img.shields.io/david/Kikobeats/browser-sync-webpack.svg?style=flat-square)](https://david-dm.org/Kikobeats/browser-sync-webpack)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/browser-sync-webpack.svg?style=flat-square)](https://david-dm.org/Kikobeats/browser-sync-webpack#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/browser-sync-webpack.svg?style=flat-square)](https://www.npmjs.org/package/browser-sync-webpack)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> BrowserSync under Webpack

## Install

```bash
$ npm install browser-sync-webpack --save
```

## Usage

### Basic

BrowserSync will start only when you run Webpack in [watch mode](http://webpack.github.io/docs/tutorials/getting-started/#watch-mode):

```bash
$ webpack --watch
```

If you're not using Webpack Dev Server, you can make BrowserSync to serve your project.
The setup is pretty easy: just pass the [BrowserSync options](http://www.browsersync.io/docs/options/) to the plugin as the first argument.

In your `webpack.config.js`:

```javascript
var BrowserSyncPlugin = require('browser-sync-webpack');

module.exports = {
  // ...
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    })
  ]
}
```

### Advanced

The advanced usage is about using [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) with BrowserSync in order to use awesome features of both.

To achieve this, BrowserSync offers the [proxy](http://www.browsersync.io/docs/options/#option-proxy) option.
So, basically, you are about to proxy the output from the Webpack Dev Server through BrowserSync to get the best out of both.

In your `webpack.config.js`:

```javascript
var BrowserSyncPlugin = require('browser-sync-webpack');

module.exports = {
  // ...
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3100/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
  ]
}
```

Another plugin options supported are `name` - BrowserSync [instance name](http://www.browsersync.io/docs/api/#api-name)
and `callback` - BrowserSync [instance init callback](http://www.browsersync.io/docs/api/#api-cb).

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
