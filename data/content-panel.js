// setup on load
self.port.on('setupPanel', setupPanel);
function setupPanel(Profiles) {
  Profiles.forEach(addProfileToPanel);
}

// add new profile box to panel
function addProfileToPanel (Profile) {
    // outer box
    var element = document.createElement('ul');
    element.className = 'profile';
    document.getElementById('profiles').appendChild(element);
    // inner list
    var profileLi = document.createElement('li');
    element.appendChild(profileLi);
    // profile toggle switch
    var toggleSw = document.createElement('input');
    toggleSw.type = 'checkbox';
    toggleSw.addEventListener('click', function(e) {
      if (this.checked) {
        self.port.emit('activate', Profile);
      } else {
        self.port.emit('deactivate', Profile);
      }
    });
    profileLi.appendChild(toggleSw);
    // profile title
    var titleLabel = document.createElement('label');
    titleLabel.className = 'profile-title';
    description = document.createTextNode(Profile.name);
    titleLabel.appendChild(description);
    profileLi.appendChild(titleLabel);
    // profile remove button
    var removeButton = document.createElement('div');
    removeButton.className = 'remove-button';
    profileLi.appendChild(removeButton);
    
    var removeButtonLabel = document.createElement('span');
    removeButtonLabel.className = 'remove-button-text';
    var text = document.createTextNode('Delete');
    removeButtonLabel.appendChild(text);
    removeButton.appendChild(removeButtonLabel);
    
    removeButton.addEventListener('click', function(e) {
      self.port.emit('removeProfile', Profile);
      element.remove();
    });
    profileLi.appendChild(removeButton);
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
