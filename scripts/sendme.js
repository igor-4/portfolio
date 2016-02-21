var sendMe = (function(){
  function initialize () {
    _setupListeners();
  }
  
  function _setupListeners () {
    $('#contact-me').on('submit', _sendMe);
  }
  
  function _sendMe (e) {
    e.preventDefault();
    var form = $(this),
        url = 'sendme.php',
        defObj = _ajaxForm (form, url);
  }
  
  function _ajaxForm (form, url) {
    if(!myValidation.validateForm(form)) return false;
  }
  
  return {
    init: initialize
  }
})();

sendMe.init();