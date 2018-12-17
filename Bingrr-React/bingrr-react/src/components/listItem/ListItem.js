/** @jsx jsx */
import "./ListItem.css";
import { css, jsx } from "@emotion/core";
// import { Link } from "@reach/router";
import { Link } from "react-router-dom";

const ListItem = props => (
  <li className="small-result">
    <Link to={{ pathname: `/${props.type}/${props.id}` }}>{props.title}</Link>
    <div id="ratingbar">
      <div id="ratingbar-percent" style={{ width: `${props.rating * 10}%` }}>
        {props.rating} / 100%
      </div>
    </div>
  </li>
);
export default ListItem;
