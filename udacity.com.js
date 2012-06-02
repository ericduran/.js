$(window).bind('keypress', function(e) {
  // Only allow it on the body.
  if(e.target.nodeName === 'BODY') {
    // Let "P" go to previous.
    if (e.keyCode === 112) {
      $('div.button')[0].click();
    }
    // "N" for next.
    if (e.keyCode === 110) {
      $('div.button')[1].click();
    }
  }
});
