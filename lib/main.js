// import modules
var { ToggleButton } = require('sdk/ui/button/toggle')
var self = require('sdk/self')
var panels = require('sdk/panel')
var simplePrefs = require('sdk/simple-prefs');
var simpleStorage = require('sdk/simple-storage');
var pageMod = require("sdk/page-mod");
var array = require('sdk/util/array');

// setup variables
var highlight_workers = [];
var activatedProfiles = []

if (!simpleStorage.storage.Profiles) {
    simpleStorage.storage.Profiles = [];
}
// test code
simpleStorage.storage.Profiles = [
  {
    id: 0,
    name: 'Search Engines',
    patterns: [
      'google',
      'yahoo'
    ]
  },
  {
    id: 1,
    name: 'movie',
    patterns: [
      'youtube',
      'niconico',
    ]
  }
];
    
// setup button
var button = ToggleButton({
  id: 'url-highlighter',
  label: 'Highlight',
  icon: self.data.url('images/icon.png'),
  onChange: function(state) {
    if (state.checked) {    
      panel.show({position: button});
    }
  }
});

// setup panel
var panel = panels.Panel({
  width: 320,
  height: 480,
  contentURL: self.data.url('content-panel.html'),
  contentScriptFile: [
    self.data.url('jquery-1.11.3.js'),
    self.data.url('content-panel.js')
  ],
  contentStyleFile: self.data.url('content-panel.css'),
  onHide: function() {
    button.state('window', {checked: false});
    }
});
panel.port.emit('setupPanel', simpleStorage.storage.Profiles );

// add profile
panel.port.on('add-profile', function (newProfile) {
  simpleStorage.storage.Profiles.push(newProfile);
  panel.port.emit('addProfile', newProfile);
});


// remove profile
  panel.port.on('removeProfile', function (toRemoveProfile) {
  var newProfiles = [];
  var toRemoveId = toRemoveProfile.id;
  newProfiles =simpleStorage.storage.Profiles .filter(function(v) {
    return (v.id !== toRemoveId);
  });
  simpleStorage.storage.Profiles  = newProfiles;
  panel.port.emit('removeProfile', newProfiles);
});

//  profile activation
panel.port.on('activate', function (activatedProfile) {
  activatedProfiles.push(activatedProfile);
  setAllToHighlight();
});

// profile de-activation
panel.port.on('deactivate', function (toDeactivateProfile) {
  var newActivatedProfiles = [];
  var toDeleteId = toDeactivateProfile.id;
  newActivatedProfiles = activatedProfiles.filter(function(v) {
    return (v.id !== toDeleteId);
  });
  activatedProfiles = newActivatedProfiles;
  setAllToHighlight();
});

// set profiles to worker
function setAllToHighlight() {
  highlight_workers.forEach( function(highlighter) {
      highlighter.port.emit('set', activatedProfiles);
    });
}
    
pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url('pageworker.js'),
  // contentStyleFile: self.data.url('highlighter.css'),
  onAttach: function (worker) {
    array.add(highlight_workers, worker);
    worker.on('pageshow', function () { array.add(highlight_workers, this); });
    worker.on('pagehide', function () { array.remove(highlight_workers, this); });
    worker.on('detach', function () { array.remove(highlight_workers, this); });
    worker.port.emit('set', activatedProfiles);
  }
});
