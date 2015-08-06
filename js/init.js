$(document).ready(function() {
  var project_id = location.hash && parseInt(location.hash.substr(1)) || 10000160;
  var scratch = new Scratch(project_id);
});
