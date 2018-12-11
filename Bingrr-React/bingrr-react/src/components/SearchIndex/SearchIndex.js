import React, { Component } from "react";
import "./SearchIndex.css";
import SearchResult from "../SearchResult/SearchResult";
import $ from "jquery";

class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch(this.props.searchTerm);
  }
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/multi?api_key=a27c7bd68ff935463cda86aa76bb96eb&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResults => {
        const results = searchResults.results;
        let resultArr = [];
        console.log(searchResults);
        results.forEach(result => {
          const resultItem = <SearchResult result={result} />;
          resultArr.push(resultItem);
        });
        this.setState({ result: resultArr });
      },
      error: (xhr, sttus, err) => {
        console.error("Failed to fetch");
      }
    });
  }
  componentWillUnmount() {
    this.setState({});
  }
  searchChangeHandler(event) {
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <table
          className="titleBar"
          style={{ width: "100%", textAlign: "center" }}>
          <tbody>
            <tr>
              <td>🎥</td>

              <td>
                <h1>MoviesDB Search</h1>
              </td>
              <td>🎥</td>
            </tr>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 24,

            width: "75%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Enter search term"
          defaultValue={`${this.props.searchTerm}`}
        />

        {this.state.result}
      </div>
    );
  }
}

//   componentDidMount() {
//     Search.getResults(this.props.id).then(result => {
//       this.setState({
//         searchResult: result
//       });
//     });
//   }
//   componentDidUpdate() {}
//   componentWillUnmount() {}
//   render() {
//     let { searchResult } = this.state;
//     return (
//       <div className="searchResults">
//         <SearchResult />
//       </div>
//     );
//   }
export default SearchIndex;
