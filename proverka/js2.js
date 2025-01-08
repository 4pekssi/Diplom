$(function() {
  // Отключаем стандартную валидацию форм для всех элементов <form>
  $("form").attr('novalidate', 'novalidate');

  // Обработчик клика по ссылкам и кнопкам переключения форм
  $('.panel__link, .form__retrieve-pass').on('click', function(e) {
      e.preventDefault(); // Предотвращаем стандартное поведение ссылок

      const target = $(this).attr('href'); // Получаем значение атрибута href у кликнутого элемента

      // Добавляем или убираем скрытие иконки в зависимости от выбранной формы
      if (target === '#register-form') {
          $('.rs_icons').hide();
      } else {
          $('.rs_icons').show();
      }

      // Переключаем класс "active" у родительских элементов ссылок и соседних форм
      if (target === '#password-form') {
          $('.panel__header').removeClass('active');
      } else {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
      }

      // Прячем все формы, кроме той, что нужно показать
      $('.panel__forms > form').not(target).hide();
      $(target).fadeIn(500); // Плавно показываем выбранную форму
  });

  // Обработчик клика по кнопке "Назад" для скрытия панелей и блюра
  $('.panel__prev-btn').on('click', function(e) {
      $('.panel, .panel_blur').fadeOut(300); // Плавно скрываем панель и блюр эффект
  });

  // Валидация формы с использованием модуля security
  $.validate({
    modules: 'security', // подключаем модуль, который даёт возможность проверить strength
      errorMessageClass: 'form__error',
      validationErrorMsgAttribute: 'data-error'
  });

  // $.formUtils.addValidator({
  //   name: 'super_strong_password',

  //   validatorFunction: function(value, $el, config, language, $form) {
  //     if (value.length < 8 || value.length > 25) return false;
  //     if (!/[A-Z]/.test(value)) return false;
  //     if (!/[a-z]/.test(value)) return false;
  //     if (!/\d/.test(value))   return false;
  //     if (!/[!@#$%^&*]/.test(value)) return false;
  //     return true;
  //   },
  //   errorMessage: 'Must be 8-25 chars, with upper, lower, digit, special char!'
  // });

  // Определение кастомного валидатора для проверки email или логина
  $.formUtils.addValidator({
    name: 'email_or_login',
    validatorFunction: function(value, $el, config, language, $form) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Шаблон для проверки e-mail
      const loginRegex = /^[a-zA-Z0-9]{3,20}$/; // Шаблон для логина
      return (emailRegex.test(value) || loginRegex.test(value));
    },
    errorMessage: 'Please enter a valid email or a 3-20 letters/numbers login.'
  });

  // ---------------------------------------
  //    Глаз для формы входа (#password)
  // ---------------------------------------

  $('.pass-hide-login').on('click', function() {
    // Находим поле пароля для входа
    const passField = $('#password');

    if (passField.attr('type') === 'password') {
      // Если скрыто -> показываем
      passField.attr('type', 'text');
      // Меняем иконку
      $(this).removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
      // Если показано[thinking] -> скрываем
      passField.attr('type', 'password');
      // Меняем иконку обратно
      $(this).removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });

  // ---------------------------------------
  //     Глаз для регистрации (2 поля)
  // ---------------------------------------
  $('.pass-hide-register').on('click', function() {
    // Находим оба поля в регистрации
    const pass1 = $('#register-password');
    const pass2 = $('#register-password-check');

    if (pass1.attr('type') === 'password') {
      // Если скрыты -> показываем
      pass1.attr('type', 'text');
      pass2.attr('type', 'text');
      // Меняем иконку
      $(this).removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
      // Иначе -> скрываем
      pass1.attr('type', 'password');
      pass2.attr('type', 'password');
      // Меняем иконку обратно
      $(this).removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });

});