Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke');
/* TODO: require bespoke-bullets ? */
var autoPlay = require('../../lib-instrumented/bespoke-auto-play.js');

describe("bespoke-auto-play", function() {

  describe("given a presentation with 2 slides specified", function() {

    var deck,

      createDeck = function() {
        var parent = document.createElement('article');
        parent.innerHTML = [
          '<section data-bespoke-auto-play="0.01"></section>',
          '<section></section>',
          '<section data-bespoke-auto-play="0.02, 0.01, 0.01"></section>',
          '<ul><li>Item 1</li><li>Item 2</li></ul>',
          '<section></section>',
          '<section data-bespoke-auto-play="0.1"></section>',
          '<section></section>'
        ].join('');

        deck = bespoke.from(parent, [
          autoPlay()
        ]);
      };

    beforeEach(createDeck);

    it('should write some tests here', function() {
        expect(true).toBe(true);
    });

    /* TODO: small timers, check deck index */

    /* TODO: pause / resume functionality */

  });

});
