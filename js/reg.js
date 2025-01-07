$(document).ready(function(){
    // Скрываем информационные поля и показываем форму логина при загрузке страницы
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
  
    // Переключение между формами "Войти" и "Регистрация"
    $('.login-reg-panel input[type="radio"]').on('change', function() {
      if($('#log-login-show').is(':checked')) {
        // Переход в режим регистрации
        $('.register-info-box').fadeOut(); 
        $('.login-info-box').fadeIn();
        $('.white-panel').addClass('right-log');
        $('.login-show').removeClass('show-log-panel');
        $('.register-show').addClass('show-log-panel');
      }
      else if($('#log-reg-show').is(':checked')) {
        // Переход в режим входа
        $('.login-info-box').fadeOut();
        $('.register-info-box').fadeIn();
        $('.white-panel').removeClass('right-log');
        $('.register-show').removeClass('show-log-panel');
        $('.login-show').addClass('show-log-panel');
      }
    });
  
    // Синхронизация пароля в режиме регистрации
    $('#password').on('input', function() {
      // Как только вбиваем пароль в поле Password,
      // тут же копируем введённый текст в Confirm Password.
      let passVal = $(this).val();
      $('#confirm_password').val(passVal);
    });
  
    // Добавляем функциональность переключения видимости пароля
    $('#toggle_password').on('click', function() {
      // Получаем текущий тип поля пароля
      let passwordField = $('#password');
      let confirmPasswordField = $('#confirm_password');
      let type = passwordField.attr('type');
  
      if(type === 'password') {
        // Меняем тип на 'text' для отображения пароля
        passwordField.attr('type', 'text');
        confirmPasswordField.attr('type', 'text');
        // Меняем текст метки
        $(this).text('Скрыть пароль');
      } else {
        // Меняем тип обратно на 'password' для скрытия пароля
        passwordField.attr('type', 'password');
        confirmPasswordField.attr('type', 'password');
        // Меняем текст метки
        $(this).text('Показать пароль');
      }
    });
  });