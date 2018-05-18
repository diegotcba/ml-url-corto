// Default BASE_PATH to / if missing
BASE_PATH = BASE_PATH || '/';

function shorten() {
  var longUrl = document.getElementById('long-url').value;

  fetch(BASE_PATH + 'create', {
    method: 'POST',
    body: JSON.stringify({longUrl: longUrl})
  }).then(function(response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function(json) {
    let teenyUrl = window.location.origin + BASE_PATH + json.shortKey;

    let linkLongUrl = '<a class="long-link" href= "' + json.longUrl + '">' + json.longUrl + '</a>';
    let linkShortUrl = '<a class="short-link" href= "' + teenyUrl + '">' + teenyUrl + '</a>';
    let inputShortUrl = '<input id="copy-input" value="' + teenyUrl + '" tabindex="-1" readonly/>';
    let copyShortUrl = '<a href="#" class="btn-copy-url">Copiar</a>';

    document.getElementById('short-url').innerHTML = linkLongUrl + linkShortUrl + inputShortUrl + copyShortUrl;

    var btnCopy = document.getElementsByClassName('btn-copy-url');

    if(btnCopy.length > 0) {
      btnCopy[0].addEventListener('click', copyToClipboard);
    }

  }).catch(function(error) {
    document.getElementById('short-url').innerHTML = 'Error shortening: ' + error;
  });
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