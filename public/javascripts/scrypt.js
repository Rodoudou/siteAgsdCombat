ScrollToTop=function() {
    var s = $(window).scrollTop();
    if (s > 250) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
   
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
  }
   
  StopAnimation=function() {
    $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
      $('html, body').stop();
    });
  }
   
   
  $(window).scroll(function() {
    ScrollToTop();
    StopAnimation();
  });

// FORM de CONTACT ##################################################################""

$('form').on('submit', (e)=>{
  e.preventDefault();

  const lastName = $('#lastName').val().trim();
  const firstName=$('#firstName').val().trim();
  const email = $('#mail').val().trim();
  const message = $('#msg').val().trim();

  const data = {
      lastName,
      firstName,
      email,
      message
  };

  console.log('<<<<dATA', data);

  $.post('/mail', data, function(){
      console.log('Server received our data');
  });

});




  