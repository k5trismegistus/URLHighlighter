self.port.on('activate', activate);

var activatedSpecifies = [];

function activate(specify) {
  console.log(specify);
  console.log(activatedSpecifies);
}

function highlight(toHighLight) {
  var anchorNodeArray = Array.slice(document.getElementsByTagName('a'));
  var chkUrl = checkUrl(toHighLight);
  anchorNodeArray.forEach(chkUrl)
}

function checkUrl(toHighLight) {
  return function(a) {
    toHighLight.forEach(
      function (url) {
        console.log(url);
        if (url.test(document.location.href)) {
          return;
        }
      
        if (url.test(a.getAttribute('href'))) {
            var spanNode = document.createElement('span');
            spanNode.setAttribute('class', 'lh_highlight');
            a.parentNode.insertBefore(spanNode, a);
            spanNode.appendChild(a);
        }
      }
    );
  }
}
