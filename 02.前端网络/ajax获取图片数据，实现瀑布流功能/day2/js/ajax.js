function ajax (option) {
  option.type = option.type ? option.type.toUpperCase() : 'GET'

  var formData = [];
  for (var key in option.data) {
    formData.push(''.concat(key, '=', option.data[key]))
  }
  if (option.type === 'GET' && formData.length > 0) {
    option.url += ''.concat('?', formData.join('&'))
  }

  var xhr = new XMLHttpRequest();
  xhr.open(option.type, option.url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        option.onSuccess(JSON.parse(xhr.responseText))
      } else {
        option.onFail(new Error(xhr.statusText))
      }
    }
  }
  if (option.type === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  xhr.send(option.type === 'POST' ? option.data : null);
}