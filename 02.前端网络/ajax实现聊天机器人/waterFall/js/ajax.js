function ajax (option) {

  // 处理请求的参数
  option.method = option.method ? option.method.toUpperCase() : 'GET';
  option.data = option.data || {}

  var formData = [];

  for (var key in option.data) {
    formData.push(''.concat(key, '=', option.data[key]))
  }

  option.data = formData.join('&')

  if (option.method === 'GET' && formData.length > 0) {
    option.url += ''.concat('?', option.data)
  }

  var xhr = new XMLHttpRequest();

  xhr.open(option.method, option.url)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        option.onSuccess(JSON.parse(xhr.responseText))
      } else {
        option.onError(new Error(xhr.statusText))
      }
    }
  }

  if (option.method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  }
  xhr.send(option.method === 'POST' ? option.data : null)
}