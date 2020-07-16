function PlayList(name) {
  this.list = new Array();
  this.random = false;
  this.currentSong = 0;
  this.name = name;

  PlayList.prototype.addSong = function (Song) {
    this.list.push(Song);
  };

  PlayList.prototype.getDuration = function () {
    let totalLength = 0;
    for (song of this.list) {
      totalLength += song.songLength;
    }
    return totalLength;
  };

  PlayList.prototype.removeSong = function (songId) {
    let found = false;
    for (let i = 0; i < this.list.length && !found; i++) {
      if (this.list[i].getId() === songId) {
        this.list.splice(i, 1);
        found = true;
      }
    }
  };

  PlayList.prototype.shuffle = function () {
    return this.list.sort(orderRandom);
    this.random = true;
  };

  PlayList.prototype.nextSong = function () {
    this.currentSong++;
    if (this.currentSong > this.list.length - 1) {
      this.currentSong = 0;
    }
    return this.list[this.currentSong];
  };

  PlayList.prototype.previousSong = function () {
    this.currentSong--;
    if (this.currentSong < 0) {
      this.currentSong = this.list.length - 1;
    }
    return this.list[this.currentSong];
  };

  PlayList.prototype.top = function () {
    let bandArray = new Array();

    for (item of this.list) {
      bandArray.push(item.getBand());
    }

    return sortByFrequency(bandArray).slice(0, 5);
  };

  PlayList.prototype.orderByDuration = function () {
    return this.list.sort(orderByLength);
  };

  PlayList.prototype.orderById = function () {
    return this.list.sort(orderById);
  };
}

function sortByFrequency(array) {
  var frequency = {};

  for (value of array) {
    frequency[value] = 0;
  }

  var uniques = array.filter(function (value) {
    return ++frequency[value] == 1;
  });

  return uniques.sort(function (a, b) {
    return frequency[b] - frequency[a];
  });
}

function orderRandom() {
  return Math.random() - 0.5;
}

function orderByLength(a, b) {
  let result = 0;
  if (a.getLength() > b.getLength()) {
    result = -1;
  } else if (a.getLength() < b.getLength()) {
    result = 1;
  }
  return result;
}

function orderById(a, b) {
  let result = 0;
  if (a.getId() > b.getId()) {
    result = 1;
  } else if (a.getId() < b.getId()) {
    result = -1;
  }
  return result;
}

function orderByRepeat(a, b, c) {
  let result = 1;
  if (a === b || a === c || b === c) {
    result = -1;
  }
  return result;
}

function compareFrequency(a, b) {
  return frequency[b] - frequency[a];
}
