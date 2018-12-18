import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import "./CastMember.css";

const CastMember = props => (
  <div className="cast-member" key={props.id}>
    <Link to={`/person/${props.id}`}>
      <img width={"80%"} src={`http://image.tmdb.org/t/p/w185${props.pic}`} />
      <div className="container-details">
        {props.name} <br />
        as... <br />
        {props.character}
      </div>
    </Link>
  </div>
);
export default CastMember;
