var { ToggleButton } = require('sdk/ui/button/toggle')
var self = require('sdk/self')
var panels = require('sdk/panel')
var simplePrefs = require('sdk/simple-prefs');
var simpleStorage = require('sdk/simple-storage');
var pageMod = require("sdk/page-mod");
var array = require('sdk/util/array');

var highlight_workers = [];
var activatedProfiles = []

if (!simpleStorage.storage.searchEngines) {
    simpleStorage.storage.searchEngines = {};
}

    var Profiles = [
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
    
    var panel = panels.Panel({
      contentURL: self.data.url('content-panel.html'),
      contentScriptFile: [
        self.data.url('jquery-1.11.3.js'),
        self.data.url('content-panel.js')
      ],
      contentStyleFile: self.data.url('content-panel.css'),
      onHide: function() {button.state('window', {checked: false});}
    });
    
var button = ToggleButton({
  id: 'url-highlighter',
  label: 'Highlight',
  icon: self.data.url('images/icon.png'),
  onChange: function(state) {
    if (state.checked) {    
      // panel.port.on('onSearchEngineToggle', onSearchEngineToggle);
      panel.show({position: button});
    }
  }
});

panel.port.emit('setupPanel', Profiles);

panel.port.on('activate', activate);
panel.port.on('deactivate', deactivate);

function activate(Profile) {
  activatedProfiles.push(Profile);
  setAllToHighlight();
}
    
function deactivate(toDeleteProfile) {
  var newProfiles = [];
  var toDeleteId = toDeleteProfile.id;
  activatedProfiles.forEach(function(Profile) {
    if (Profile.id == toDeleteId) {
      newProfiles = activatedProfiles.filter(function(v) {
        return (v.id !== toDeleteId);
      });
      activatedProfiles = newProfiles;
    }
  });
  setAllToHighlight();
}

function setAllToHighlight() {
  highlight_workers.forEach( function(highlighter) {
      highlighter.port.emit('set', activatedProfiles);
    }
  );
}
    
    
highlight_workers.forEach(function(highlighter) {
  highlighter.port.on('require', function() {
      highlighter.port.emit('set', activatedProfiles);
    }
  )
});
        
pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url('highlighter.js'),
  contentStyleFile: self.data.url('highlighter.css'),
  onAttach: function(worker) {
    array.add(highlight_workers, worker);
    // http://stackoverflow.com/questions/15502043/addon-sdk-context-menu-and-page-mod-workers
    worker.on('pageshow', function() { array.add(highlight_workers, this); });
    worker.on('pagehide', function() { array.remove(highlight_workers, this); });
    worker.on('detach', function() { array.remove(highlight_workers, this); });
    worker.port.emit('set', activatedProfiles);

  }
});
