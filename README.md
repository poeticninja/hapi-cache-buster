Hapi Cache Buster
=================

A Hapi cache buster for assets (css, javascript, images, etc) in your view templates.

## Goal:
Have the client/browser reload new assets when there is a new version.

## How it works:
It grabs the package.json version number of your application and uses that as the cache version. In your view template you can now access `version.cache`. You can place it where you are needing to update cache.

Lets say your package.json is version `0.0.1`, it will print out `?v=001`. To bust the cache you just update your package.json version to a new number.


Handlebars:
`<link rel="stylesheet" href="css/styles.css{{version.cache}}">`

Jade:
`link(rel='stylesheet', href='css/styles.css#{version.cache}')`

### Options
Instead of using the package.json version for the cache version, you can specify a number and pass it into the plugin options.

### Other
You can see this being used in the Hapi Ninja boilerplate example. [https://github.com/poeticninja/hapi-ninja](https://github.com/poeticninja/hapi-ninja)