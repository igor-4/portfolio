var myWorks = (function () {
  
  //инициализация 
  function initialize () {
    _setupListeners();
  }
  
  //прослушка событий
  function _setupListeners () {
    $('.createnew-hover').on('click', _showModal);
    $('.exit-popup').on('click', _hideModal);
    $('#popup-form').on('submit', _addProject);
    $('input[name="project-file"]').on('change', _uploadFile);
  }
  
  function _uploadFile () {
    var fileName = $('input[type="file"]').val();
    fileName = fileName.substr(fileName.lastIndexOf('\\')+1);
    if(fileName){
      $('.popup-addfile').removeClass('error').text(fileName);
      $('.popup-addfile').trigger('hideTooltip');
    }else if(fileName===''){
      myValidation.tooltip($('.popup-addfile'), $('.popup-addfile').attr('qtip-position'));
      $('.popup-addfile').addClass('error').text('');
    }
  }
  
  //показывает модальное окно
  function _showModal (e) {
    e.preventDefault();
    $('.popup-outer').fadeIn(300, function(){
    return $('.popup-center-inner').slideDown(400); 
    });
    $('input[type="file"]').val('');
    $('.popup-addfile').removeClass('error').text('загрузите изображение');
  }
  
  //прячет модальное окно
  function _hideModal () {
    $('.popup-center-inner').slideUp(400, function() {
      return $('.popup-outer').fadeOut(400);
    });
    $('input, textarea, .popup-addfile').trigger('hideTooltip').removeClass('error');
    $('input[type="text"], textarea').val('');
    $('.error-mes').hide();
    $('.popup-addfile').text('');
  }
  
  //собирает и обрабатывает данные для добавления нового проекта;
  function _addProject (e) {
    e.preventDefault();
    var form = $(this),
        url = 'myworks.php',
        myServerGiveMeAnANswer = _universalAjax(form, url);
    
    _uploadFile ();
    
    
    if(myServerGiveMeAnANswer){
    myServerGiveMeAnANswer.done(function(answer){ 
      if(answer.status==='ok'){
        $('.fail').text('').hide();
        $('.success').text(answer.text).show();
      }else{
        $('.success').text('').hide();
        $('.fail').text(answer.text).show();
      }
    })
      .fail(function(){
      console.log('Ошибка при работе с сервером');  
    })
      .always(function(){
      console.log('ajax-запрос');
    })
  };
  }
  
  //Универсальная функция отправки данных
  //для ее работы используется:
  //@form - форма
  //$url - адресс(месторасположение) php файла, к которому мы обращаемся
  //задачи функции:
  //собирает данные из формы
  //проверяет форму(если готово valid )
  //делает запрос на сервер(получает ответ с сервера)
  function _universalAjax (form, url) {
    
    /*if(!valid){ return false};*/
    if(!myValidation.validateForm(form)) return false;
    
    var data = form.serialize(),
        result;
    
    result = $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    });
    
    return result;
  }
  
  //публичные методы
  return {
    init: initialize
  }
  
})();

myWorks.init();