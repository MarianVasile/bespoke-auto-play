# bespoke-auto-play

AutoPlay timed sequence for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js)

Automatically plays all the sides in a presentation.

Classes specified in `data-bespoke-auto-play` attributes will be added to the list of [classes](#classes) that are provided by default.

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/markvasile/bespoke-auto-play/master/dist/bespoke-auto-play.min.js
[max]: https://raw.github.com/markvasile/bespoke-auto-play/master/dist/bespoke-auto-play.js

## Usage

```js
var bespoke = require('bespoke'),
  auto-play = require('bespoke-auto-play');

bespoke.from('#presentation', [
  auto-play()
]);
```

Then add `data-bespoke-auto-play` attributes to your slides, indicating time to play in seconds.
You can add a sequence of times for things like bullet points.

```html
<article>

  <section data-bespoke-auto-play="4.5">
    Special auto-play
  </section>

  <section data-bespoke-auto-play="12, 1, 1.5, 2">
    Super special auto-play with bullet points.
    <ul>
        <li>Bullet 1</li>
        <li>Bullet 2</li>
        <li>Bullet 3</li>
        <li>Bullet 4</li>
        <li>Bullet 5</li>
    </ul>
  </section>

</article>
```

 > Not using CommonJS? View the full [Bespoke.js plugin documentation](https://github.com/markdalgleish/bespoke.js/#plugins).

## Package managers

### npm

```bash
$ npm install bespoke-auto-play
```

### Bower

```bash
$ bower install bespoke-auto-play
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
