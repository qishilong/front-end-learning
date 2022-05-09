function ajax (option) {

  option.method = option.method ? option.method.toUpperCase() : 'GET';
  option.data = option.data || {};
  option.type = option.type || 'json';

  var formData = [];

  for (key in option.data) {
    formData.push(''.concat(key, '=', option.data[key]))
  }
  option.data = formData.join('&')

  if (option.method === 'GET' && formData.length > 0) {
    option.url += ''.concat('?', option.data);
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = option.type;
  xhr.withCredentials = false;  //指示是否应使用Cookie或授权标头等凭据进行跨站点访问控制请求。
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (option.onSuccess && typeof option.onSuccess === 'function') {
          option.onSuccess(option.dataType === 'JSON' && typeof xhr.response === 'string' ? JSON.parse(xhr.response) : xhr.response)
        }
      } else {
        if (option.error && typeof option.error === 'function') {
          option.error(new Error(xhr.statusText))
        }
      }
    }
  }

  xhr.open(option.method, option.url, true); // true 代表是异步请求
  if (option.method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  }
  xhr.send(option.method === 'POST' ? option.data : null);
}
