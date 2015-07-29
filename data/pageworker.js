var activatedProfiles = [];

self.port.on('set', function (activatedProfiles) {
    this.activatedProfiles = activatedProfiles;
    highlight(getToHighlight());
});

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
  chkUrl(anchorNodeArray, toHighLight).forEach( function (a) {
    a.style.backgroundColor = "yellow";
    a.classList.add('lh-highlight');
  });
}

function chkUrl(anchors, patterns) {
  var matchedAnchors = [];
  for (var i = 0; i < anchors.length; i++) {
    for (var j= 0; j < patterns.length; j++) {
      if ( anchors[i].href.indexOf(patterns[j]) != -1 ) {
        matchedAnchors.push(anchors[i]);
      }
    }
  }
  return matchedAnchors;
}

self.port.on('correctUrl', correctUrl);
function correctUrl(toCopyProfile) {
  var anchorNodeArray = document.getElementsByTagName('a');
  var copied = '';
  chkUrl(anchorNodeArray, toCopyProfile.patterns).forEach( function (a) {
    copied = copied + a.href + '\n';
  });
  self.port.emit('copied', copied);
}
