$(document).ready(function() {

    function initMenuButtons() {
        var $buttons = $('.js-menu-button');
        $buttons.on('click', function() {
            toggleSection($(this));
        });
    }

    function toggleSection($button) {
        var aimed_section = $button.data('section');
        var $sections = $('.js-section');
        var $buttons = $('.js-menu-button');

        $buttons.removeClass('active');
        $button.addClass('active');

        $sections.each(function() {
            var $this = $(this);
            var section = $this.data('section');

            if (section == aimed_section) {
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
    }

    initMenuButtons();

});
