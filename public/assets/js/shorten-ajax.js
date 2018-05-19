// Default BASE_PATH to / if missing
BASE_PATH = BASE_PATH || '/';

function shorten() {
  var longUrl = document.getElementById('long-url').value;

  const createEndpoint = BASE_PATH + 'create';
  //const createEndpoint = 'https://comprar-en.ml/create';

  fetch(createEndpoint, {
    method: 'POST',
    body: JSON.stringify({longUrl: longUrl})
  }).then(function(response) {
    return response.json();
  }).then(function(json){
    if(json.error) {
      showApiError(json);
    } else {
      showShortUrl(json);
    }
  })
  .catch(function(error) {
    document.getElementById('short-url').innerHTML = 'Error shortening: ' + error;
  });
}

function showApiError(json) {
      document.getElementById('short-url').innerHTML = 'Error shortening: ' + json.error;    
}

function showShortUrl(json) {
      let teenyUrl = window.location.origin + BASE_PATH + json.shortKey;

      let linkLongUrl = '<div><a class="long-link" href= "' + json.longUrl + '">' + json.longUrl + '</a></div>';
      let linkShortUrl = '<a class="short-link" href= "' + teenyUrl + '">' + teenyUrl + '</a>';
      let inputShortUrl = '<input id="copy-input" value="' + teenyUrl + '" tabindex="-1" readonly/>';
      let copyShortUrl = '<a href="#" class="btn-copy-url">Copiar</a>';

      document.getElementById('short-url').innerHTML = linkLongUrl + '<div>' + linkShortUrl + inputShortUrl + copyShortUrl + '</div>';

      var btnCopy = document.getElementsByClassName('btn-copy-url');

      if(btnCopy.length > 0) {
        btnCopy[0].addEventListener('click', copyToClipboard);
      }  
}

function copyToClipboard(e) {
  e.preventDefault();
  e.stopPropagation()

  var copyInput = document.getElementById('copy-input');

  if(copyInput) {
    copyInput.select();

    document.execCommand('copy');
  }
}