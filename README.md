![iora][title-image]
====

<img align="right" height="300" src="http://i.imgur.com/a9f8cP8.jpg">

[![Version][npm-version-image]][npm-link] [![Travis][travis-image]][travis-link] [![Downloads][npm-downloads-image]][npm-link] [![Gitter][gitter-image]][gitter-link]

Iora is a boilerplate stuffed into a command line tool for making modular HTTP/HTTPS servers through Express in a breeze.  You route certain requests to certain JavaScript files via a `iora.json`.  You can also add iora middleware that's either npm hosted or local, you just drop those into your iora.json too!  Check out the [iora-static]() middleware if you're interested in making a portion of your server into a static file-serve.

# Install
You can install iora via npm:

```
npm install -g iora
```
(May require `sudo`)

# Usage
```
iora <command> [directory] [options...]
```

Run `iora help` for a list of commands and their usage.

# Documentation
Iora is documented at www.iorajs.org/docs/, right now this is not wiki-style, but [new.iorajs.org/docs/](https://github.com/iora/new.iorajs.org) is currently being developed and will be wiki-style.  So keep checking in!

# Contributing
See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on contributing guidelines.

# [License](LICENSE)
Iora, and any contributions made towards iora are licensed under MIT.

# Thanks to
 - [Dustin Dowell (Whale)](https://github.com/dustindowell22): Creating an awesome logo for iora, free of charge.


 [npm-downloads-image]: https://img.shields.io/npm/dm/iora.svg?style=flat-square
 [travis-image]: https://img.shields.io/travis/iora/iora.svg?style=flat-square
 [npm-version-image]: https://img.shields.io/npm/v/iora.svg?style=flat-square
 [gitter-image]: https://badges.gitter.im/Join%20Chat.svg
 [title-image]: http://i.imgur.com/0PSnkDt.png

 [travis-link]: https://travis-ci.org/iora/iora
 [npm-link]: https://www.npmjs.com/package/iora
 [gitter-link]: https://gitter.im/iora/iora
