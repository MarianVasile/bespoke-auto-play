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

    var playStatus = 1;
    document.addEventListener('click', function() {
        if (!playStatus) {
            playStatus = 1;
            resumeSlide();
        } else {
            playStatus = 0;
            pauseSlide();
        }
    });

    deck.on('activate', nextSlide);
  };
};
