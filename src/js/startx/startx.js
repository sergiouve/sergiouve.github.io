$(document).ready(function() {

  function initMenuButtons() {
    var $buttons = $('.js-menu-button');

    $buttons.on('click', function() {
      $this = $(this);
      toggleSection($this);

      if ($this.data('section') == 'projects') {
        getMyRepos();
      } else {
        emptyProjectsSection();
      }
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

  function getMyRepos() {
    var endpoint = 'https://api.github.com/users/sergiouve/repos';
    var repos_type = 'owner';
    var sort = 'pushed';
    var direction = 'desc';

    $.ajax({
      url: endpoint,
      method: 'GET',
      data: 'type=' + repos_type + '&sort=' + sort + '&direction=' + direction,
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      success: function(response) {
        populateProjectsSection(response);
      },
      error: function(response) {
        console.log('fire, FIRE!');
      }
    });
  }

  function populateProjectsSection(reposInfo) {
    Object.keys(reposInfo).map(function(key, index) {
      printRepoInfo(reposInfo[key]);
    });
  }

  function emptyProjectsSection() {
    var $sections = $('.js-section');
    var $projectElements = $projectsSection.find('.project');

    var $projectsSection = $sections.filter(function() {
      return $(this).data('section') == 'projects';
    });

    $projectElements.remove();
  }

  function printRepoInfo(repoInfo) {
    var $sections = $('.js-section');
    var $projectsSection = $sections.filter(function() {
      return $(this).data('section') == 'projects';
    });

    var $projectDiv = $('<div class="project"><h5>' + repoInfo.name + '</h5><p>' + repoInfo.description + '</p></div>');
    // TODO
    // $projectDiv.css('display', 'none');
    // $projectDiv.slideToggle(500);
    $projectsSection.append($projectDiv);
  }

  initMenuButtons();

});
