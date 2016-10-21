$(document).ready(function() {

    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }

    var $main = $('main');
    var $nameElement = $main.find('.js-name-box');

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

    var triggerSpiceNameUp = function() {
        $nameElement.html(surrondCharsWithSpan($nameElement));

        window.setInterval(function() {
            spiceNameUp();
        }, 50);
    }

    $nameElement.on('click', function() {
        triggerSpiceNameUp();
    });

});

