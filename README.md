# iora [![Version][npm-version-image]][npm-link] [![Travis][travis-image]][travis-link] [![Downloads][npm-downloads-image]][npm-link] [![Gitter][gitter-image]][gitter-link]
Make your servers modular and easier to manage with iora.

## Purpose
Iora was made to be a boilerplate for modular express servers.  It should be fairly simple to understand and use if you already have experience in express, although if not it should still be quite easy to learn.

## Middleware
Iora middleware is quite easy to implement, they're called "controllers".  Controllers have access direct access to the app and express object, so they can bind resources from iora and express into the server as middleware.  Middleware comes in the form of custom and npm hosted.  You have a `controllersDir`, which every file in there is applied.  Then you have a `controllers` array, which is npm middleware, such as `iora-static`: `"controllers": ["iora-static"]`.

Controllers also have access to the configuration object, so they can have custom configuration or can see the configuration already used.

## Routing
With iora, you can route domains with express routes, and you can also make that route only work on a certain sub-domain.  If you set a `routesDir` property in your configuration file, you can easily bind files to routes.


 [npm-downloads-image]: https://img.shields.io/npm/dm/iora.svg
 [travis-image]: https://img.shields.io/travis/iora/iora.svg
 [npm-version-image]: https://img.shields.io/npm/v/iora.svg
 [gitter-image]: https://badges.gitter.im/Join%20Chat.svg

 [travis-link]: https://travis-ci.org/iora/iora
 [npm-link]: https://www.npmjs.com/package/iora
 [gitter-link]: https://gitter.im/iora/iora
