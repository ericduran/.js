$(window).bind('keypress', function(e) {
  // Let "P" go to previous.
  if (e.keyCode === 112) {
    $('div.button')[0].click();
  }
  // "N" for next.
  if (e.keyCode === 110) {
    $('div.button')[1].click();
  }
});
