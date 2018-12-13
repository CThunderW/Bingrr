var axios = require("axios");
const cache = require("../cache");
const tmdb = "https://api.themoviedb.org/3/";
const tmdbKey = "api_key=a27c7bd68ff935463cda86aa76bb96eb";

let cachedData = cache;

module.exports = {
  async indexLists(req, res) {
    console.log(cachedData.cache);
    // if (cachedData.get("movieResult") || cachedData.get("tvResult")) {
    // if (cachedData.get("movieesult") || cachedData.get("tvesult")) {
    //   res.json({
    //     movieResult: cachedData.get("movieeResult"),
    //     tvResult: cachedData.get("tvvResult")
    //   });
    // } else
    const popularMovies = tmdb + `movie/popular?` + tmdbKey;
    const popularTV = tmdb + `tv/popular?` + tmdbKey;
    console.log(popularTV);
    console.log(popularMovies);
    const promiseArray = [axios.get(popularMovies), axios.get(popularTV)];
    const [movieResultRaw, tvResultRaw] = await Promise.all(promiseArray);
    const movieResult = movieResultRaw.data.results;
    const tvResult = tvResultRaw.data.results;
    console.log(movieResult);
    // cachedData.set({ movieResult, tvResult });
    res.send({ movieResult, tvResult });
  },

  search(req, res) {
    const { search_query } = req.body;
    let searchResult = axios
      .get(tmdb + "search/multi?" + tmdbKey + "&query=" + search_query)
      .then(function(response) {
        let searchData = response.data.results;
        console.log(response.data);
        console.log(response.status);
        res.send({ searchData, search_query });
      });
  },
  // person(req, res) {
  //   const { id } = req.params;
  //   const searchKey = tmdb + `person/${id}?` + tmdbKey;
  //   console.log(searchKey);
  //   let personDataRaw = axios.get(searchKey).then(function(response) {
  //     let personData = response.data;
  //     console.log(response.data);
  //     res.send({ personData });
  //   });
  // },
  async person(req, res) {
    const { id } = req.params;
    const searchKey = tmdb + `person/${id}?` + tmdbKey;
    const creditsKey = tmdb + `person/${id}/combined_credits?` + tmdbKey;
    console.log(searchKey);
    const promiseArray = [axios.get(searchKey), axios.get(creditsKey)];
    const [personRaw, creditsRaw] = await Promise.all(promiseArray);
    const person = personRaw.data;
    const credits = creditsRaw.data.cast;
    // console.log(credits);
    res.send({ person, credits });
  },

  async movieShow(req, res) {
    const { id } = req.params;
    const searchKey = tmdb + `movie/${id}?` + tmdbKey;
    const movieCast = tmdb + `movie/${id}/credits?` + tmdbKey;
    // console.log(movieCast);
    console.log(searchKey);
    console.log(movieCast);
    const promiseArray = [axios.get(searchKey), axios.get(movieCast)];
    const [{ data: singleData }, cast] = await Promise.all(promiseArray);
    const credits = cast.data.cast;
    console.log("first cast: " + credits[0].name);
    res.send({ singleData, credits });
  },

  async tvShow(req, res) {
    const { id } = req.params;
    const searchKey = tmdb + `tv/${id}?` + tmdbKey;
    const tvCast = tmdb + `tv/${id}/credits?` + tmdbKey;
    console.log(searchKey);
    console.log("search.js line 63: " + tvCast);
    const promiseArray = [axios.get(searchKey), axios.get(tvCast)];
    const [{ data: singleData }, cast] = await Promise.all(promiseArray);
    const credits = cast.data.cast;
    // console.log("credits: ", credits);
    console.log("search line 67: " + cast.data);
    console.log("first cast: " + credits[0].name);
    res.send({ singleData, credits });
  }
};
