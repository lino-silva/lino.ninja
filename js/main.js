var timelineBlocks = $('.timeline-block'),
  offset = 0.8,
  jQWindow = $(window),
  windowHeight = jQWindow.height(),
  profile_image = document.getElementById('profile_image'),
  imageOffsetTop = profile_image.offsetTop,
  imageHeight = profile_image.clientHeight;

//hide timeline blocks which are outside the viewport
hideBlocks(timelineBlocks, offset);

//on scolling, show/animate timeline blocks when enter the viewport
jQWindow.on('scroll', function(){
  (!window.requestAnimationFrame) 
    ? setTimeout(function () { 
        showBlocks(timelineBlocks, offset);

      }, 100)
    : window.requestAnimationFrame(function () { 
      showBlocks(timelineBlocks, offset); 
    });
}).on('resize', function () {
  windowHeight = jQWindow.height();
});

function hideBlocks(blocks, offset) {
  var scrollTop = jQWindow.scrollTop();
  blocks.each(function () {
    var jQThis = $(this);
    ( jQThis.offset().top > scrollTop + windowHeight * offset ) && jQThis.find('.timeline-img, .timeline-content').addClass('is-hidden');
  });

  (scrollTop > imageOffsetTop + (imageHeight / 2))?
    profile_image.classList.add('collapsed'):
    profile_image.classList.remove('collapsed');
}

function showBlocks(blocks, offset) {
  var scrollTop = jQWindow.scrollTop();
  blocks.each(function () {
    var jQThis = $(this);
    (jQThis.offset().top <= scrollTop + windowHeight * offset && jQThis.find('.timeline-img').hasClass('is-hidden') ) && jQThis.find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
  });
  
  (scrollTop > imageOffsetTop + (imageHeight / 2))?
    profile_image.classList.add('collapsed'):
    profile_image.classList.remove('collapsed');
}

var story_container = $('.story-container');
if (story_container && story_container.length) {
  setTimeout(function() {
    var max = 0;
    for (var i = 0, l = story_container.length; i < l; i++) {
      var currentHeight = story_container.eq(i).height();
      if (currentHeight > max) {
        max = currentHeight;
      }
    }

    story_container.css('height', max);
  }, 20);
}

$(function() {
  $('a[href*=#]:not([href=#])').on("click", function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 60
        }, 1000);
        return false;
      }
    }
  });
});
