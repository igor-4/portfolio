var myValidation = (function() {
  
  function initialize() {
    _setupListeners();
  }
  
  function _setupListeners() {
    $('input, textarea').on('keydown', _removeError);
    $('form').on('reset', _resetForm);
  }
  
  function _resetForm () {
    $(this).find('.error').removeClass('error');
    $(this).find('input[type="text"],textarea').trigger('hideTooltip');
  }
  
  function _removeError() {
    $(this).removeClass('error');
  }
  
  //публичная функция для валидации данных форм
  function formValidation (form) {
      var elements = form.find('input[type="text"], textarea').not('input[type="file"]'),
          valid = true;
    
    $.each(elements,function(index, value) {
      var element = $(this),
          position = $(this).attr('qtip-position'),
          val = $(value).val().trim();
      
      if (!val){
        element.addClass('error');
        createTooltip(element, position);
        valid = false;
      }
    });
    
    return valid;
  }
  
  function createTooltip (element, position) {
    if (position==='left'){
      position = {
        my: 'center right',
        at: 'center left'
      }
    }else{
        position = {
          my: 'center left',
          at: 'center right'
        }
      }
    
    element.qtip({
      content: {
        text: function(){
          return $(this).attr('qtip-content');
        }
      },
      position : position,
      style: {
        classes : 'qtip-red qtip-rounded qtip-shadow'
      },
      show: {event: 'show'},
      hide: {event: 'keydown hideTooltip'}
    }).trigger('show');
  };
  
  //публичные методы
  return {
    initial: initialize,
    validateForm : formValidation,
    tooltip: createTooltip
  }
  
})();

myValidation.initial();