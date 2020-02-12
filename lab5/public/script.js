
  // if (localStorage.getItem('artistList') !== null) {
  //   let retrievedArtists = localStorage.getItem('artistList');
  //   let parsedRetrievedArtists = JSON.parse(retrievedArtists);
  //   parsedRetrievedArtists.forEach((artistObj) => {
  //     addArtist(artistObj.artist, artistObj.about, artistObj.url, false);
  //   })
  // } else {
  //   localStorage.setItem('artistList', '[]');
  // }
  let data = fetch("/add").then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data)
    if (data.length != 0) {
      data.forEach((artistObj) => {
        addArtist(artistObj.artist, artistObj.about, artistObj.url, false);
      })
    }
  })


function showToggle() {
  var x = document.getElementById('artists_hidden');
  if (!x.style.display) {
    x.style.display = 'none';
  }
  if (x.style.display == 'none') {
    x.style.display = 'flex';
    x.style.flexDirection = 'column';
    x.style.alignItems = 'center';
  } else {
    x.style.display = 'none';
  }
}

const deleteUser = (event, artist, about, url) => {
  let theArtist = {'artist': artist, 'about': about, 'url': url};
  fetch('/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(theArtist)
  }).then(res => {
    console.log(res);
  })
  event.target.parentNode.parentNode.parentNode.remove();
};

function addArtist(artist = null, about = null, url = null, store = true) {
  var artist = artist? artist : document.getElementById('artist').value;
  var about = about? about : document.getElementById('about').value;
  var url = url? url : document.getElementById('imageurl').value;

  if (store) {
    let theArtist = {'artist': artist, 'about': about, 'url': url};
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theArtist)
    }).then(res => {
      console.log(res);
    })
    
  }

  document.getElementById('artists_items').insertAdjacentHTML('beforeend',
    `<div style="padding:10px;"><div class="artists_item">
    <div class="artists_item-left"><img src=
    ${url}
    alt="img"/>
    </div><div style="margin-left: 10px" class="artists_item-right"><div class="artists_item-right-description"><h3>
    ${artist}
    </h3><p>
    ${about}
    </p></div>
    </div><div><button type="submit" onclick="deleteUser(event, '${artist}', '${about}', '${url}')" class="delete-btn">Delete</button></div></div></div>`);
}

function searchFilter() {
  var input = document.getElementById('searchInput').value.toUpperCase();
  var items = document.getElementById('artists_items');
  items.textContent = '';

  let retrievedArtists = fetch("/add").then((res) => {
    return res.json();
  }).then((data) => {
    data.forEach((artistObj) => {
      if (isPartOfTheString(input, artistObj.artist.toUpperCase())) {
        addArtist(artistObj.artist, artistObj.about, artistObj.url, false);
      }
    })
  })
}

function isPartOfTheString(attemptString, realString) {
  let [i, j] = [0, 0];
  let [M, N] = [attemptString.length, realString.length];
  while (i < M && j < N) {
      if (attemptString[i] == realString[j])
          ++i, ++j;
      else
          ++j;
  }
  return i == M;
}