# OnScreen Keyboard

This is a very simple on screen keyboard.

#### Usage

  - includes osr-keyboard.js in html file
  - `<input type="text" id="example"/>`
  - `$('#example').osrKeyboard();`

#### Advanced Usage
  - you can pass in an onEnter callback, it will be called when 'Enter' is hitted
  - `$('#example').osrKeyboard('show',{ onEnter: function(e) { ... } });`
  - or `$('#example').osrKeyboard({ onEnter: function(e) { ... } });`