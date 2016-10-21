$(document).ready(function() {

    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }

    var $main = $('main');
    var $nameElement = $main.find('.js-name-box');
    var spiceInterval;

    var getRandomHexColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    var surrondCharsWithSpan = function($element) {
        var elementChars = $element.text();

        for (var i = 0, length = elementChars.length; i < length; i++) {
            elementChars[i] = elementChars.replaceAt(i, '<span>' + elementChars[i] + '</span>');
        }
        return elementChars;
    }

    var spiceNameUp = function() {
        $nameElement.css('color', getRandomHexColor());
    }

    var toggleSpiceNameUp = function() {
        $nameElement.html(surrondCharsWithSpan($nameElement));
        $nameElement.toggleClass('js-spice-active');

        if ($nameElement.hasClass('js-spice-active')) {
            spiceInterval = setInterval(function() {
                spiceNameUp();
            }, 50);
        } else {
            clearInterval(spiceInterval);
        }
    }

    $nameElement.on('click', function() {
        toggleSpiceNameUp();
    });

});

