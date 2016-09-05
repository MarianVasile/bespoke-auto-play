/*!
 * bespoke-auto-play v1.0.2-pre
 *
 * Copyright 2016, Mark Marian Vasile
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.autoPlay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return function(deck) {

    var timer = [];
    var timerStart;
    function nextSlide(event, delay) {
        if (typeof delay === 'undefined') {
            delay = event.slide.getAttribute('data-bespoke-auto-play');
        }
        if (delay) {
            if (typeof delay === 'string' && ~delay.indexOf(',')) {
                delay = delay.split(',');
            }
            if (typeof delay === 'object' && delay.length) {
                timerStart = [(new Date()).getTime(), delay[0], delay];
                timer.push(setTimeout(function() {
                        deck.next();
                        var remaining = delay.slice(1);
                        if (remaining.length) {
                            nextSlide(event, delay.slice(1));
                        }
                    }, delay[0] *1000));
            } else {
                // timerStart = [current time, time to next slide, delay for next slide]
                timerStart = [(new Date()).getTime(), delay, delay];
                timer.push(setTimeout(deck.next, delay*1000));
            }
        }
    }

    var timerPaused;
    function pauseSlide() {
        timerPaused = (new Date()).getTime();
        for (var i=0; i<timer.length; i++) clearTimeout(timer[i]);
        timer = [];
    }

    function resumeSlide() {
        var remain = 1000 * timerStart[1] - (timerPaused - timerStart[0]);
        timer.push(setTimeout(function() {
                deck.next();
                nextSlide({
                    slide: deck.slides[deck.slide()],
                    index: deck.slide()
                }, timerStart[2]);
            }, remain)
        );
    }

    var ch = document.getElementsByTagName('body')[0];
    var playStatus = 1;
    ch.onclick = function() {
        if (!playStatus) {
            playStatus = 1;
            resumeSlide();
        } else {
            playStatus = 0;
            pauseSlide();
        }
    };

    deck.on('activate', nextSlide);
  };
};

},{}]},{},[1])(1)
});