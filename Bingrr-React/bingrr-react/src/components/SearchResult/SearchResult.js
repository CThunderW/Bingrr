import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchResult.css";

// We used the term 'results: resultArr' to set this state in fn performSearch();
class SearchResult extends Component {
  viewResult() {
    const url =
      "https://www.themoviedb.org/" +
      this.props.result.type +
      "/" +
      this.props.result.id;
    window.location.href = url;
  }
  render() {
    const imgPath =
      this.props.result.media_type === "person"
        ? this.props.result.profile_path
        : this.props.result.poster_path;
    return (
      <div className="cast-member" key={this.props.result.id}>
        <Link to={`/${this.props.result.media_type}/${this.props.result.id}`}>
          <img width={"40%"} src={`http://image.tmdb.org/t/p/w185${imgPath}`} />
          <div className="container-details">
            <h3>
              {this.props.result.name} {this.props.result.title}
            </h3>
            <br />
          </div>
        </Link>
      </div>
    );
    // return (
    //   <li className="search-result">
    //     <Link to={`/${this.props.result.media_type}/${this.props.result.id}`}>
    //       {this.props.result.name}
    //       {this.props.result.title}
    //     </Link>
    //   </li>
    // );
  }
}

export default SearchResult;
