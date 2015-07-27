// setup on load
self.port.on('setupPanel', setupPanel);
function setupPanel(Profiles) {
  Profiles.forEach(addProfileToPanel);
}

// add new profile box to panel
function addProfileToPanel (Profile) {
    var element = document.createElement('tr');
    element.className = 'Profile';
    var th = document.createElement('th');
    th.className = 'Profile-title'
    description = document.createTextNode(Profile.name);
    th.appendChild(description);

    var td = document.createElement('td');
    var checkbox_highlight = document.createElement('input');
    checkbox_highlight.type = 'checkbox';
    checkbox_highlight.addEventListener('click', function(e) {
      if (this.checked) {
        self.port.emit('activate', Profile);
      } else {
        self.port.emit('deactivate', Profile);
      }
    });
    td.appendChild(checkbox_highlight);

    element.appendChild(th);
    element.appendChild(td);

    document.getElementById('Profiles').appendChild(element);
}

// on new profile added
self.port.on('addProfile', function (newProfile) {
  addProfileToPanel(newProfile);
});

// add new profile
document.getElementById('new-profile-save-button').addEventListener('click', function () {
  var newProfile = {
    id: Math.floor(Math.random()*1000),
    name:  $("#new-profile-name").val(),
    patterns:  $("#new-profile-pattern").val().split(",")
  };
  self.port.emit('add-profile', newProfile);
});
