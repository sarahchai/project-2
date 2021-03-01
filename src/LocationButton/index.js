import React, { Component } from "react";
import "./style.css";


class LocationButton extends Component {
  updateResult = (event) => {
    this.props.changeLocation(event);
  }
  render() {
    return (
      <div className="location-button-container">
        <select className="location-select" value={this.props.locationValue} onChange={this.updateResult}>
          <option value="All">All</option>
          <option value="20th Street">W 20th Street</option>
          <option value="21st Street">W 21st Street</option>
          <option value="22nd Street">W 22nd Street</option>
          <option value="24th Street">W 24th Street</option>
          <option value="25th Street">W 25th Street</option>
        </select>
      </div>
    )
  }
}

export default LocationButton;