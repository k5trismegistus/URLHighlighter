self.port.on('setupPanel', setupPanel);
// self.port.on('logInnerHTML', logInnerHTML);

function setupPanel(specifies) {
  specifies.forEach(addSpecifyToPanel);
  
  // (function() {
  //     $(':checkbox').iphoneStyle();
  // })();
}

function addSpecifyToPanel(specify)
{
    var element = document.createElement('tr');
    element.className = 'specify';
    var th = document.createElement('th');
    th.className = 'specify-title'
    description = document.createTextNode(specify.name);
    th.appendChild(description);

    var td = document.createElement('td');
    var checkbox_highlight = document.createElement('input');
    checkbox_highlight.type = 'checkbox';
    checkbox_highlight.addEventListener('click', function(e) {
      if (this.checked) {
        self.port.emit('activate', specify);
      } else {
        self.port.emit('deactivate', specify);
      }
    });
    td.appendChild(checkbox_highlight);

    element.appendChild(th);
    element.appendChild(td);

    document.getElementById('specifies').appendChild(element);
}
