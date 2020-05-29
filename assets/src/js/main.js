

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%handle push proposal butn%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
$(document).ready(function() {
    $(".ff-btn-app").click(function(){
      var data = {
        action: 'proposal_ajax_send',
        phone: $('input[name=phone]').val()
      };
      // get all from php/js values
      //connect to php admin url
      $.post(window.wp.ajax_url, data,  function(response){

      console.log(response);
    },'json');
    });
});


// #########################################menu hide###################################################
$(function() {
    var menuVisible = false;
    $('.hide_menu').click(function() {
      if (menuVisible) {
        $('.resp-nav-bar').css({'display':'none'});

        menuVisible = false;

        return;
      }
      $('.resp-nav-bar').css({'display':'block'});
      menuVisible = true;
    });
    $('.resp-nav-bar').click(function() {
      $(this).css({'display':'none'});

      menuVisible = false;
    });
  });
  // ############################################################################################
  $(function(){

    var $links = $('.scroll-menu a');

      $links.on('click', function(e){
          e.preventDefault();

          var link = $(this);
          var $target = $(link.attr('href'));

      if($target.length > 0){
        $('html, body').animate({
          scrollTop: $target.offset().top
        }, 100);
      }

      })});

      window.onload = function () {
        //initialize swiper when document ready
        var mySwiper = new Swiper ('.swiper-container', {
          // Optional parameters
          direction: 'horizontal',
          loop: true
        })
      };
