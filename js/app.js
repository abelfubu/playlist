const btn = document.getElementById('toggle');
const aside = document.querySelector('aside');
const main = document.querySelector('.content');
const form = document.querySelector('#form');
const content = document.querySelector('.grid');
const addList = document.querySelector('#form-list');
const sidebarList = document.querySelector('#list-ul');
const topBands = document.querySelector('#top5');
const pTitle = document.querySelector('#p-title');
const shuffleBtn = document.querySelector('#shuffle');
const listOfPlaylists = new Array();
let defaultPlayList = new PlayList('myList');
listOfPlaylists.push(defaultPlayList);
let playList = listOfPlaylists[0];
let songCount = 0;

let id = 0;

window.addEventListener('resize', function () {
  if (document.documentElement.clientWidth < 1025) {
    aside.classList.replace('slide-in', 'slide-out');
    main.style.marginLeft = 0;
    btn.innerHTML = '=';
    open = !open;
  } else if (document.documentElement.clientWidth > 1025) {
    aside.classList.replace('slide-out', 'slide-in');
    main.style.marginLeft = '260px';
    btn.innerHTML = 'X';
    open = !open;
  }
});

let open = true;
const removeSong = songId => {
  listOfPlaylists[id].removeSong(songId);
  mountContent(playList);
};
const mountContent = arr => {
  console.log(arr);
  content.innerHTML = '';
  for (let song of arr) {
    let element = document.createElement('div');
    element.innerHTML = `<div class='card zoom'>
    <div><span>Título</span><h3>${song.title}</h3></div>
      <div><span>Banda</span><p>${song.band}</p></div>
      <div><span>Duración</span><p>${convertirSegundos(
        song.songLength
      )}</p></div>
      <button onclick="removeSong(${song.id})">X</button>
    </div>`;
    content.appendChild(element);
  }
};

const toggleSidebar = () => {
  if (open) {
    aside.classList.replace('slide-in', 'slide-out');
    main.style.marginLeft = 0;
    btn.innerHTML = '=';
  } else {
    aside.classList.replace('slide-out', 'slide-in');
    main.style.marginLeft = '260px';
    btn.innerHTML = 'X';
  }
  open = !open;
};

const setPlaylist = pId => {
  id = pId;
  playList = listOfPlaylists[pId].list;
  mountContent(playList);
  pTitle.innerHTML = listOfPlaylists[id].name;
  mountTop();
};

const addPlayList = event => {
  event.preventDefault();
  let newListInput = document.querySelector('#newlist').value;

  if (newListInput.trim() !== '') {
    sidebarList.innerHTML = '';
    id = 0;
    let newPlayList = new PlayList(newListInput);
    listOfPlaylists.push(newPlayList);

    for (let item of listOfPlaylists) {
      let element = document.createElement('ul');

      element.innerHTML = `<li onclick="setPlaylist(${id})" id="${id++}">${
        item.name
      }</li>`;
      sidebarList.appendChild(element);
    }
    addList.reset();
    id--;
    playList = listOfPlaylists[id].list;
    mountContent(newPlayList.list);
    mountTop();
    pTitle.innerHTML = listOfPlaylists[id].name;
  } else {
    document.getElementById('error-playlist').style.visibility = 'visible';
    setTimeout(() => {
      document.getElementById('error-playlist').style.visibility = 'hidden';
    }, 5000);
  }
};

const addSong = event => {
  event.preventDefault();
  let iName = document.querySelector('#name').value;
  let iAlbum = document.querySelector('#band').value;
  let iDuration = document.querySelector('#duration').value;
  if (iName.trim() !== '' && iAlbum.trim() !== '' && iDuration.trim() !== '') {
    let newSong = new Song(iName, iAlbum, iDuration, null, songCount++);
    playList.push(newSong);
    mountContent(playList);
  } else {
    document.getElementById('error').style.visibility = 'visible';
    setTimeout(() => {
      document.getElementById('error').style.visibility = 'hidden';
    }, 5000);
  }
  mountTop();
  form.reset();
};

const shuffle = () => {
  listOfPlaylists[id].shuffle();
  mountContent(playList);
};

// Mounting top5
function mountTop() {
  topBands.innerHTML = '';
  let topItems = listOfPlaylists[id].top();
  for (let item of topItems) {
    let element = document.createElement('ul');

    element.innerHTML = `<li>${item}</li>`;

    topBands.appendChild(element);
  }
}

// Mounting playlist
for (let item of listOfPlaylists) {
  let element = document.createElement('ul');

  element.innerHTML = `<li onclick="setPlaylist(${id})" id="${id++}">${
    item.name
  }</li>`;

  sidebarList.appendChild(element);
}

function convertirSegundos(segundos) {
  var horas = parseInt(segundos / 3600);
  var restoHoras = segundos % 3600;
  var min = parseInt(restoHoras / 60);
  var restoSegundos = parseInt(segundos % 60);
  if (horas < 10) {
    horas = '0' + horas;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (restoSegundos < 10) {
    restoSegundos = '0' + restoSegundos;
  }
  return min + 'm:' + restoSegundos + 's';
}

id = 0;
playList = listOfPlaylists[0].list;

mountTop();

btn.addEventListener('click', toggleSidebar);
shuffleBtn.addEventListener('click', shuffle);
form.addEventListener('submit', event => addSong(event));
addList.addEventListener('submit', event => addPlayList(event));
