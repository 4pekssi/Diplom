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
      modules : 'security',
      errorMessageClass: 'form__error',
      validationErrorMsgAttribute: 'data-error'
  });

  // Определение кастомного валидатора для проверки email или логина
  $.formUtils.addValidator({
    name: 'email_or_login',
    validatorFunction: function(value, $el, config, language, $form) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Шаблон для проверки e-mail
      const loginRegex = /^[a-zA-Z0-9]{3,20}$/; // Шаблон для логина

      if (emailRegex.test(value)) {
        return true; // Валидно как email
      }
      if (loginRegex.test(value)) {
        return true; // Валидно как логин
      }
      return false; // Не валидно ни под email, ни под логин
    },
    errorMessage: 'Please enter a valid email or a 3-20 letters/numbers login.'
  });

  // Обработчик клика по кнопке скрытия/показа пароля
  $(document).ready(function() {
      $('.pass-hide').on('click', function() {
        const pass1 = $('#register-password');
        const pass2 = $('#register-password-check');

        if (pass1.attr('type') === 'password') {
          pass1.attr('type', 'text'); // Показываем пароль
          pass2.attr('type', 'text'); // Показываем подтверждение пароля
          $(this).removeClass('fa-eye').addClass('fa-eye-slash'); // Меняем иконку на видимую форму пароля
        } else {
          pass1.attr('type', 'password'); // Скрываем пароль
          pass2.attr('type', 'password'); // Скрываем подтверждение пароля
          $(this).removeClass('fa-eye-slash').addClass('fa-eye'); // Меняем иконку на скрытую форму пароля
        }
      });
  });
});