/*
 *  * Tinycon - A small library for manipulating the Favicon
 *   * Tom Moor, http://tommoor.com
 *    * Copyright (c) 2012 Tom Moor
 *     * MIT Licensed
 *      * @version 0.2.6
 *      */

(function(){var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){var exists=(typeof(links[i])!=='undefined');if(exists&&links[i].getAttribute('rel')==='icon'){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(num,colour){if(!getCanvas().getContext||browser.safari||options.fallback==='force'){return updateTitle(num)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var num=num||0;var src=getCurrentFavicon();faviconImage=new Image();faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if(num>0)drawBubble(context,num,colour);refreshFavicon()};if(!src.match(/^data/)){faviconImage.crossOrigin='anonymous'}faviconImage.src=src};var updateTitle=function(num){if(options.fallback){if(num>0){document.title='('+num+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,num,colour){var len=(num+"").length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(num,15,browser.mozilla?7:6)};var refreshFavicon=function(){if(!getCanvas().getContext)return;setFaviconTag(getCanvas().toDataURL())};Tinycon.setOptions=function(custom){options={};for(var key in defaults){options[key]=custom.hasOwnProperty(key)?custom[key]:defaults[key]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(num,colour){if(isNaN(parseFloat(num))||!isFinite(num))return log('Bubble must be a number');drawFavicon(num,colour);return this};Tinycon.reset=function(){Tinycon.setImage(originalFavicon)};Tinycon.setOptions(defaults);window.Tinycon=Tinycon})();

setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 15000);

function updateDockBadge() {
  var newBadge = 0;

  // loop thru anchor tags
  var anchorEls = document.getElementsByTagName('span');

  var regex = /Click to see (\d+) new message/;
  var continueon = true;
  for (var i = 0; i < anchorEls.length; i++) {
    if (anchorEls[i].classList.contains('yj-notice-text')) {
      var anchorEl = anchorEls[i];
      if (anchorEl.offsetHeight == 0 && anchorEl.offsetWidth == 0) {
        continue;
      }
      var text = '' + anchorEl.innerText;
      if (!text.length) {
        continue;
      }
      var res = text.match(regex);
      if (res && res.length > 1) {
        newBadge = res[1];
        if (!continueon) {
          break;
        }
        continueon = false;
      }
    }
    var notifications = parseInt(anchorEls[i].innerHTML);
    if (anchorEls[i].classList.contains('yj-notifications-indicator-count') && !isNaN(notifications) && notifications > 0) {
      Tinycon.setOptions({
        background: '#d2382b',
      });
      if (!continueon) {
        break;
      }
      continueon = false;
    }
    else if(continueon) {
      Tinycon.setOptions({
        background: '#135eaa',
      });
    }
  }
  Tinycon.setBubble(newBadge);
}

