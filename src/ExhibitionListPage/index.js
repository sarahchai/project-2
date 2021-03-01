import React, { Component } from "react";
import "./style.css";
import 'react-datepicker/dist/react-datepicker.css';

import ExhibitionList from "../ExhibitionList";
import LocationButton from "../LocationButton";
import Moment from "moment";
import DatePicker from 'react-datepicker';

import { extendMoment } from 'moment-range';

const extmoment = extendMoment(Moment);

class ExhibitionListPage extends Component {

  resultList = () => {
    if (this.props.dateValue === null && this.props.locationValue === 'All') {
      return this.props.exhibitionInfo
    } else if (this.props.dateValue !== null && this.props.locationValue === 'All') {
      const dateResult = this.props.exhibitionInfo.filter(exhibitions => {
        const startDate = new Date(exhibitions.startDate)
        const endDate = new Date(exhibitions.endDate)
        const range = extmoment().range(startDate, endDate)
        return range.contains(this.props.dateValue._d)
      })
      return dateResult
    } else if (this.props.dateValue === null && this.props.locationValue !== 'All') {
      const locationResult = this.props.exhibitionInfo.filter(exhibitions => exhibitions.galleryAddress.includes(this.props.locationValue));
      return locationResult;
    } else {
      const dateResult = this.props.exhibitionInfo.filter(exhibitions => {
        const startDate = new Date(exhibitions.startDate)
        const endDate = new Date(exhibitions.endDate)
        const range = extmoment().range(startDate, endDate)
        return range.contains(this.props.dateValue._d)
      })
      const totalResult = dateResult.filter(exhibitions => exhibitions.galleryAddress.includes(this.props.locationValue));
      return totalResult
    }
  }

  render() {
    return (
      <div className="exhibition-list-page">
        <div className="buttons">
          <div className="date-button-containder">
            <DatePicker
              selected={this.props.dateValue}
              onChange={this.props.changeDate}
              placeholderText="Select the date"
            />
            <input className="clear-button" type="button" value="Clear" onClick={this.props.clearDate}></input>
          </div>
          <LocationButton
            locationValue={this.props.locationValue}
            changeLocation={this.props.changeLocation}
          />
          <input className="view-all-buttton" type="button" value="View All" onClick={this.props.viewAll}></input>
        </div>
        <p className="notice">✔︎: Opening reception scheduled.</p>
        <ExhibitionList
          exhibitionInfo={this.resultList()}
          setDetailsPage={this.props.setDetailsPage}
        />
      </div>
    )
  }
}

export default ExhibitionListPage;