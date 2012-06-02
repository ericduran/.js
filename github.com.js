/**
 * Github.com
 * Add a Delete All button next to read all, in the inbox.
 */

(function() {
  // Add a "Delete All" option when we're on our inbox.
  if ($('#inbox').length) {
    $del = $('<a class="minibutton">').click(function () {
      $('.mini-icon-delete-note').click();
      // Give it some time to delete everything then reload.
      window.setTimeout(function() {
        window.location.reload();
      }, 500);
    }).html('Delete All');

    $p = $('#inbox h1').siblings('p');
    if ($p.length) {
      // Lets add a delete all options.
      $p.prepend($del);
    }
    else {
      $p = $('<p style="margin-top:5px;margin-bottom:-10px;text-align:right">');
      $p.html($del).append('<div class="rule">').insertAfter($('#inbox h1'));
    }
  }
})();
