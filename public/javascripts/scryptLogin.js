ScrollToTop=function() {
    var s = $(window).scrollTop();
    if (s > 250) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
   
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
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


// SING IN SIGN UP#################################################################""

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
      if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });