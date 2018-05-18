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

    let linkShortUrl = '<a class="short-link" href= "' + teenyUrl + '">' + teenyUrl + '</a>';
    let inputShortUrl = '<input id="copy-input" value="' + teenyUrl + '" tabindex="-1" readonly/>';
    let copyShortUrl = '<a href="#" class="btn-copy-url">Copiar</a>';

    document.getElementById('short-url').innerHTML = linkShortUrl + inputShortUrl + copyShortUrl;

    document.getElementsByClassName('btn-copy-url').addEventListener('click', copyToClipboard);
  }).catch(function(error) {
    document.getElementById('short-url').innerHTML = 'Error shortening: ' + error;
  });
}



function copyToClipboard(e) {
  e.preventDefault();
  e.stopPropagation()

  var copyInput = document.getElementById('copy-input');

  copyInput.select();

  document.execCommand('copy');
}