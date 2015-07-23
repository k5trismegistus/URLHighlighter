self.port.on('setupPanel', setupPanel);
// self.port.on('logInnerHTML', logInnerHTML);

function setupPanel(Profiles) {
  Profiles.forEach(addProfileToPanel);
  
  // (function() {
  //     $(':checkbox').iphoneStyle();
  // })();
}

function addProfileToPanel(Profile)
{
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
