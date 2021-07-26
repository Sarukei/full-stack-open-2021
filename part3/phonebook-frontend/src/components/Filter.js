import React from "react";

const Filter = (props) => (
  <div>
    filter shown with{" "}
    <input
      onChange={(e) => props.setSearchFilter(e.target.value)}
      value={props.searchFilter || ""}
    />
  </div>
);

export default Filter;
