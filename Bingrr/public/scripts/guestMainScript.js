console.log("guestMainScriptLoaded");

let show = "brooklyn+nine+nine";

$.getJSON("https://www.omdbapi.com/?apikey=f8951cbe&t=" + show, function(data) {
  console.log(data);

  var title = data.Title;
  var plot = data.Plot;
  var year = data.Year;
  var seasons = data.totalSeasons;
  var actors = data.Actors;
  var poster = data.Poster;

  $(".poster").attr("src", poster);
  $(".title").append(title);
  $(".plot").append(plot);
  $(".year").append(year);
  $(".seasons").append(seasons + " seasons");
  $(".actors").append("Starring: " + actors);
});
