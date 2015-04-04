Hapi Cache Buster
=================

A Hapi cache buster for assets (css, javascript, images, etc) in your view templates.

## Goal:
Have the client/browser reload new assets when there is a new version.

## How it works:
It grabs the package.json version number of your application from the node process current working directory and uses that as the cache version. In your view template you can now access `version.cache`. You can place it where you are needing to update cache.

Lets say your package.json is version `0.0.1`, it will print out `?v=001`. To bust the cache you just update your package.json version to a new number.


Handlebars:
`<link rel="stylesheet" href="css/styles.css{{version.cache}}">`

Jade:
`link(rel='stylesheet', href='css/styles.css#{version.cache}')`

### Options
Instead of using the package.json version for the cache version, you can specify a number and pass it into the plugin options.

```
{
  register: require('hapi-cache-buster'),
  options: {
    version: 55
  }
}
```


### Other
You can see this being used in the Hapi Ninja boilerplate example. [https://github.com/poeticninja/hapi-ninja](https://github.com/poeticninja/hapi-ninja)

### Troubleshooting
If for some reason you are getting an error because its unable to find the package.json you can actually pass in the package.json version manually `require('./package.json').version`. This is useful if your current process working directory `process.cwd()` is different from the actual application.
