import { truncateSync } from "fs";

const BASE_URL = "http://localhost:4321";
export const Trending = {
  getAll() {
    return fetch(`${BASE_URL}/main`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
  },
  getMovie(id) {
    return fetch(`${BASE_URL}/movie/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
  },
  getShow(id) {
    return fetch(`${BASE_URL}/tv/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
  }
};

export const Cast = {
  getCast(mediaType, id) {
    console.log("backend: ", `${BASE_URL}/${mediaType}/${id}`);
    return fetch(`${BASE_URL}/${mediaType}/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
    // How to change the above line to a string
  },
  getPerson(id) {
    return fetch(`${BASE_URL}/person/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
  }
};

export const Search = {
  getResults(search_query) {
    return fetch(`${BASE_URL}/search`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
  }
};

export const Session = {
  create(params) {
    return fetch(`${BASE_URL}/session`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(params)
    }).then(res => {
      console.log("line 86 found user?: " + res);
      return res.json();
    });
  },
  destroy() {
    return fetch(`${BASE_URL}/session/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(res => {
      res.json();
    });
  }
};

export const User = {
  current() {
    return fetch(`${BASE_URL}/users/current`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(currentUser => {
      return currentUser.json();
    });
  }
};
