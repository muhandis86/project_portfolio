$(document).ready(function(){
  $('.carousel__inner').slick({
    // speed: 1000,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></img></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></img></button>',
    // arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
          breakpoint: 991,
          settings: {
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 575,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal windows

  $('[data-modal=consultation]').on('click', function() {
   $('.overlay, #consultation').fadeIn('fast');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('fast');
    });
  });

  $(window).on('click', function(e) {
    if (e.target.classList.contains('overlay')) {
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    }
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {   // esc
       $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    }
  });

  // $('#consultation-form').validate();
  // $('#consultation form').validate();
  // $('#order form').validate();

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Введите имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
              },
            phone: "Введите номер телефона",
            email: {
              required: "Введите e-mail",
              email: "Неправильно введен e-mail"
            }
        }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('fast');
        $('form').trigger('reset');
    });
    return false;
  });

  // Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
        $('.pageup').fadeIn('fast');
    } else {
        $('.pageup').fadeOut('fast');
    }
  });

  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();

});



