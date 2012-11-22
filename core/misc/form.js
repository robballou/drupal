(function ($) {

"use strict";

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function () {
    var userInfo = ['name', 'mail', 'homepage'];
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var $formContext = $(this);
      var i, il, $element, cookie;
      for (i = 0, il = userInfo.length; i < il; i += 1) {
        $element = $formContext.find('[name=' + userInfo[i] + ']');
        cookie = $.cookie('Drupal.visitor.' + userInfo[i]);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      }
    });
  }
};

})(jQuery);
