$(document).ready(function(){function t(){var t=$(".js-menu-button");t.on("click",function(){$this=$(this),e($this),"projects"==$this.data("section")&&n()})}function e(t){var e=t.data("section"),n=$(".js-section"),o=$(".js-menu-button");o.removeClass("active"),t.addClass("active"),n.each(function(){var t=$(this),n=t.data("section");n==e?t.addClass("active"):t.removeClass("active")})}function n(){var t="https://api.github.com/users/sergiouve/repos",e="owner",n="updated",s="desc";$.ajax({url:t,method:"GET",data:"type="+e+"&sort="+n+"&direction="+s,headers:{Accept:"application/vnd.github.v3+json"},success:function(t){i(),o(t)},error:function(t){console.log("fire, FIRE!")}})}function o(t){Object.keys(t).map(function(e,n){s(t[e])})}function i(){var t=$(".js-section"),e=t.filter(function(){return"projects"==$(this).data("section")}),n=e.find(".project");n.remove()}function s(t){var e=$(".js-section"),n=e.filter(function(){return"projects"==$(this).data("section")});console.log(t);var o='<div class="project"><h4>'+t.name+"</h4><p>"+t.description+"</p></div>";n.append(o)}t()});