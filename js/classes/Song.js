function Song(title, band, songLength, rating, id) {
  this.title = title;
  this.band = band;
  this.songLength = songLength;
  this.rating = rating;
  this.id = id;

  Song.prototype.print = function () {
    return (
      'La cancion ' +
      this.title +
      ' me encanta, y en Apple solo le dan ' +
      this.rating +
      ' estrellas'
    );
  };

  Song.prototype.getBand = function () {
    return this.band;
  };

  Song.prototype.getLength = function () {
    return this.songLength;
  };

  Song.prototype.getId = function () {
    return this.id;
  };
}
