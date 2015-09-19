![iora][title-image]
====

<img align="right" height="300" src="http://www.iorajs.org/resources/images/iora.svg">

[![Version][npm-version-image]][npm-link]
[![Travis][travis-image]][travis-link]
[![Gitter][gitter-image]][gitter-link]

Iora is a boilerplate stuffed into a command line tool for making modular HTTP/HTTPS servers through Express in a breeze.  You route certain requests to certain JavaScript files via a `iora.json`.  You can also add iora middleware that's either npm hosted or local, you just drop those into your iora.json too!  Check out the [iora-static](https://github.com/iora/iora-static) middleware if you're interested in making a portion of your server into a static file-serve.

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
Iora is documented here on GitHub through the [Wiki pages](https://github.com/iora/iora/wiki), you can find a lot of information from the community there.  But, you can also find official documentation at www.iorajs.org/docs/

# Contributing
See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on contributing guidelines.  It contains information about creating issues, contributing through forks and pull requests, and how your contributions are licensed. (Pretty important stuff!!)

# License
Iora and any contributions made towards iora are licensed under MIT.  

See the [LICENSE](LICENSE) file for more information about MIT and how this product is licensed.

# Thanks to
 - [Dustin Dowell](https://github.com/dustindowell22) for creating us an awesome logo, free of charge.


 [travis-image]: https://travis-ci.org/iora/iora.svg?branch=master
 [npm-version-image]: https://badge.fury.io/js/iora.svg
 [gitter-image]: https://badges.gitter.im/Join%20Chat.svg
 [title-image]: http://i.imgur.com/0PSnkDt.png

 [travis-link]: https://travis-ci.org/iora/iora
 [npm-link]: https://www.npmjs.com/package/iora
 [gitter-link]: https://gitter.im/iora/iora
