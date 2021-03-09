
function globleFunctionDeclaration() {

    jobTestimonial() 
    headerScroll1()
    RatingReviews()
    searchSide()
    infoecSide()
    mainmenuSide()
    Stepthreefunc()
    Starrating()
    inputnextots()
    imagethumns()
  }

function jobTestimonial() {
  $(document).ready(function () {
    var owl = $('.jobavails');
    owl.owlCarousel({
      items: 4,
      loop: true,
      margin: 0,
      autoplay: false,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
          dots: false,
          mouseDrag: true,
          touchDrag: false
        },
        600: {
          items: 1,
          nav: true,
          dots: false,
        },
        1000: {
          items: 1,
          nav: true,
          dots: false,
          loop: true
        }
      }
    });
    $('.play').on('click', function () {
      owl.trigger('play.owl.autoplay', [3000])
    })
    $('.stop').on('click', function () {
      owl.trigger('stop.owl.autoplay')
    })


  })
}




function RatingReviews() {
  $(document).ready(function () {
    var owl = $('.reviesawaits');
    owl.owlCarousel({
      items: 4,
      loop: true,
      margin: 0,
      autoplay: false,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
          mouseDrag: true,
          touchDrag: false
        },
        600: {
          items: 3,
          nav: false
        },
        1000: {
          items: 3,
          nav: true,
          dots: true,
          loop: true
        }
      }
    });
    $('.play').on('click', function () {
      owl.trigger('play.owl.autoplay', [3000])
    })
    $('.stop').on('click', function () {
      owl.trigger('stop.owl.autoplay')
    })


  })
}


function Stepthreefunc() {
  $(document).ready(function () {
    var owl = $('.stepthreemobs');
    owl.owlCarousel({
      items: 1,
      loop: false,
      margin: 0,
      autoplay: false,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true,
          mouseDrag: true,
          touchDrag: false
        },
        600: {
          items: 1,
          nav: false,
          dots: true
        },
        1000: {
          items: 1,
          nav: false,
          dots: true,
          loop: false
        }
      }
    });
    $('.play').on('click', function () {
      owl.trigger('play.owl.autoplay', [3000])
    })
    $('.stop').on('click', function () {
      owl.trigger('stop.owl.autoplay')
    })


  })
}

function headerScroll1() {
    var nav = $(".clbhdr");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
  
      if (scroll >= 20) {
        nav.removeClass('clbhdr').addClass("navfixed");
      } else {
        nav.removeClass("navfixed").addClass('clbhdr');
      }
    });
  }


  function searchSide() {
    $(".searchtab").click(function(){
      $(".notopeninpt").toggleClass("openinp");
    });
  }

  function infoecSide() {
    $(".thumbusersh").click(function(){
      $(".inforeach").toggleClass("openinfo");
    });
  }


  function mainmenuSide() {
    $(".menuicoburgs").click(function(){
      $(".menushowmobs").toggleClass("openslidesme");
    });
  }



  function Starrating() {
    $('#stars li').on('click', function(){
      var onStar = parseInt($(this).data('value'), 10); 
      var stars = $(this).parent().children('li.star');
      
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
       
      
    });
  }

  function inputnextots(){
  $(".fgtp").keyup(function(){

    if($.isNumeric($(this).val())){
      if($(this).val())
      $(this).next().focus()
    }else{
      $(this).val('')
    }
    
  })

}

function imagethumns(){
  $(".thumbareasupd").each(function(){
   
    var refRatio = 240/300;
    
    var imgH = $(this).children("img").height();
    var imgW = $(this).children("img").width();
    
    if ( (imgW/imgH) < refRatio ) { 
        $(this).addClass("portrait");
    } else {
        $(this).addClass("landscape");
    }
})
}

