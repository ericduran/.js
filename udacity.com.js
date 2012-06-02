$(window).bind('keypress', function(e) {
  // Lol lets make sure is not an input form.
  if(e.target.nodeName != 'INPUT') {
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
