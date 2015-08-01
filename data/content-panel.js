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
    
    // profile title
    var titleLabel = document.createElement('label');
    titleLabel.className = 'profile-title';
    description = document.createTextNode(Profile.name);
    titleLabel.appendChild(description);
    profileLi.appendChild(titleLabel);
    
    // button box
    var buttonBox = document.createElement('div');
    buttonBox.className = 'buttonContainer';
    profileLi.appendChild(buttonBox);
    
    // profile highlight button
    var highlightButton = document.createElement('div');
    highlightButton.className = 'button highlight-button-disabled';
    profileLi.appendChild(highlightButton);
    var highlightButtonLabel = document.createElement('span');
    highlightButtonLabel.className = 'highlight-button-text';
    var text = document.createTextNode('Highlight');
    highlightButtonLabel.appendChild(text);
    highlightButton.appendChild(highlightButtonLabel);
    highlightButton.addEventListener('click', function(e) {
      if (highlightButton.classList.contains('highlight-button-disabled')) {
        highlightButton.classList.remove('highlight-button-disabled');
        highlightButton.classList.add('highlight-button-enabled');
        self.port.emit('activate', Profile);
      } else {
        highlightButton.classList.remove('highlight-button-enabled');
        highlightButton.classList.add('highlight-button-disabled');
        self.port.emit('deactivate', Profile);
      }
    });
    buttonBox.appendChild(highlightButton);
    
    // copy all button
    var copyButton = document.createElement('div');
    copyButton.className = 'button copy-button';
    profileLi.appendChild(copyButton);
    var copyButtonLabel = document.createElement('span');
    copyButtonLabel.className = 'copy-button-text';
    var text = document.createTextNode('Copy All');
    copyButtonLabel.appendChild(text);
    copyButton.appendChild(copyButtonLabel);
    copyButton.addEventListener('click', function(e) {
      self.port.emit('copy', Profile);
    });
    buttonBox.appendChild(copyButton);
    
    // profile edit button
    var editButton = document.createElement('div');
    editButton.className = 'button edit-button';
    profileLi.appendChild(editButton);
    var editButtonLabel = document.createElement('span');
    editButtonLabel.className = 'edit-button-text';
    var text = document.createTextNode('Edit');
    editButtonLabel.appendChild(text);
    editButton.appendChild(editButtonLabel);
    editButton.addEventListener('click', function(){
      editProfile(element, Profile)
    });
    buttonBox.appendChild(editButton);
    
    // profile remove button
    var removeButton = document.createElement('div');
    removeButton.className = 'button remove-button';
    profileLi.appendChild(removeButton);
    var removeButtonLabel = document.createElement('span');
    removeButtonLabel.className = 'remove-button-text';
    var text = document.createTextNode('Delete');
    removeButtonLabel.appendChild(text);
    removeButton.appendChild(removeButtonLabel);
    removeButton.addEventListener('click', function() {
      removeProfile(element, Profile)
    });
    buttonBox.appendChild(removeButton);
}

// on new profile added
self.port.on('addProfile', function (newProfile) {
  addProfileToPanel(newProfile);
});

// edit profile
function editProfile (element, Profile) {
  $("#new-profile-name").val(Profile.name);
  $("#new-profile-pattern").val(Profile.patterns.join(','));
  removeProfile(element, Profile);
}

// remove new profile
function removeProfile (element, Profile) {
  self.port.emit('removeProfile', Profile);
  element.remove();
}

// add new profile from form
document.getElementById('save-button').addEventListener('click', function () {
  var newProfile = {
    id: Math.floor(Math.random()*1000),
    name:  $("#new-profile-name").val(),
    patterns:  $("#new-profile-pattern").val().split(",")
  };
  self.port.emit('add-profile', newProfile);
  $("#new-profile-name").val('');
  $("#new-profile-pattern").val('');
});
