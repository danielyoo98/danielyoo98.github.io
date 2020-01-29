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

const deleteUser = (event) => {
  console.log(event.target);
  event.target.parentNode.parentNode.parentNode.remove();
};

function addArtist() {
  var artist = document.getElementById('artist').value;
  var about = document.getElementById('about').value;
  var url = document.getElementById('imageurl').value;



  document.getElementById('artists_items').insertAdjacentHTML('beforeend',
    '<div style="padding:10px;"><div class="artists_item">' +
    '<div class="artists_item-left"><img src=' +
    '"' +
    url +
    '"' +
    'alt="img"/>' +
    '</div><div style="margin-left: 10px" class="artists_item-right"><div class="artists_item-right-description"><h3>' +
    artist +
    '</h3><p>' +
    about +
    '</p></div>' +
    '</div><div><button onclick="deleteUser(event)" class="delete-btn">Delete</button></div></div></div>');

    document.getElementById('artist').value = '';
    document.getElementById('about').value = '';
    document.getElementById('imageurl').value = '';
  }




