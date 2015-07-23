var activatedProfiles = [];

self.port.on('set', function(activatedProfiles) {
    this.activatedProfiles = activatedProfiles;
    highlight(getToHighlight());
  }
);

function getToHighlight() {
  var activatedUrls = [];
  this.activatedProfiles.forEach(
    function(as) {
      activatedUrls = activatedUrls.concat(as.patterns);
    }
  );
  return activatedUrls;
}

function highlight(toHighLight) {
  var anchorNodeArray = document.getElementsByTagName('a');
  var chkUrl = checkUrl(toHighLight);
  for (var i = 0; i < anchorNodeArray.length; i++) {
    chkUrl(anchorNodeArray[i]);
  }
}

function checkUrl(toHighLight) {
  return function(a) {
    toHighLight.forEach(
      function (url) {
        if (a.href.indexOf(url) != -1) {
            a.setAttribute('class', 'lh_highlight');
        }
      }
    );
  };
}
