/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */



$(document).ready(function() {
  console.log('app.js loaded!');


 $.get("/api/albums", function(albums){
    console.log(albums);
    albums.forEach(function(oneAlbum){
      renderAlbum(oneAlbum);
    });
  });

  $('#album-form form').on("submit", function(event){
  event.preventDefault();
  var formData = $(this).serialize();
  $.post('/api/albums', formData, function(album) {
  renderAlbum(album);

    });

    $(this).trigger("reset");
  });


  $('#albums').on('click', '.add-song', function(e){
    var id= $(this).parents('.album').data('album-id');
    $('#songModal').data('album-id', id).modal();

    $('#saveSong').one('click',function(event){
      event.preventDefault();
      console.log('tried to submit a new song!');
      var newSong = {
        name: $('#songName').val(),
        trackNumber: Number($('#trackNumber').val())
      };
      var listRef = "#songListId"+id;
      $.post('/api/albums/' + $('#songModal').data('album-id') + '/songs', newSong, function(song){
        console.log('listRef.html:',$(listRef).html());
        $(listRef).html($(listRef).html() + " (" + song.trackNumber + ") " + song.name + " -");
        $('#trackNumber').val('');
        $('#songName').val('');
        $('#songModal').modal('hide');
      });
    });
    console.log('id',id);
  });
  console.log('app.js loaded!');
});

function getAlbums(){
  var myAlbums = $.get('http://localhost:3000/api/albums',function(albumList){
    albumList.forEach(function(album){
      renderAlbum(album);
    });
  });
}


function buildSongsHTML(songs, albumId){
  if(!albumId){albumId = "";}
  var songList = 
  "  <li class='list-group-item'>" +
  "   <h4 class='inline-header'>Songs:</h4>" +
  "     <span id = 'songListId" + albumId + "'> -";
  if(songs){
    songs.forEach(function(song){
      songList += " (" + song.trackNumber + ") " + song.name + " -";
    });
   } 
  songList +=  
  "     </span>" + 
  "  </li>";
  return songList;


}









// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);



  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 album-art'>" +
  "                     <img class='img-fluid' src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName+ "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery

$("#albums").append(albumHtml);

}




