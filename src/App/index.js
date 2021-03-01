import React, { Component } from "react";
import "./style.css";

import ExhibitionListPage from "../ExhibitionListPage";
import ExhibitionDetailsPage from "../ExhibitionDetailsPage";
import Moment from "moment";

import { StickyContainer, Sticky } from 'react-sticky';
import { exhibitionInfo } from "../Data/data.js";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 'exhibitionList',
      detailsPage: {},
      dateValue: null,
      locationValue: 'All',
    }
  }

  changeLocation = (event) => {
    localStorage.setItem("locationValue", JSON.stringify(event.target.value))
    this.setState({
      locationValue: event.target.value,
    })

    this.setState(prevState => {
      if (prevState.dateValue === null) {
        localStorage.setItem("dateValue", JSON.stringify(prevState.dateValue))
        return ({
          dateValue: prevState.dateValue,
        })
      } else {
        localStorage.setItem("dateValue", new Date(prevState.dateValue))
        return ({
          dateValue: prevState.dateValue,
        })
      }
    })
  }

  changeDate = (date) => {
    localStorage.setItem("dateValue", new Date(date))
    this.setState({
      dateValue: date,
    })
    this.setState(prevState => {
      localStorage.setItem("locationValue", JSON.stringify(prevState.locationValue))
      return ({
        locationValue: prevState.locationValue,
      })
    })
  }

  clearDate = () => {
    this.setState({
      dateValue: null,
    })
  }

  viewAll = () => {

    this.setState({
      dateValue: null,
      locationValue: 'All',
    })
  }

  goBack = () => {
    if (this.state.dateValue === null && this.state.locationValue === 'All') {
      this.setState({
        currentPage: 'exhibitionList',
        dateValue: null,
        locationValue: 'All',
      })
    } else if (this.state.dateValue === null && this.state.locationValue !== 'All') {
      this.setState({
        currentPage: 'exhibitionList',
        dateValue: null,
        locationValue: JSON.parse(localStorage.getItem("locationValue")),
      })
    } else {
      this.setState({
        currentPage: 'exhibitionList',
        dateValue: Moment(localStorage.getItem("dateValue")),
        locationValue: JSON.parse(localStorage.getItem("locationValue")),
      })
    }
  }

  setDetailsPage = (exhibitionId) => {
    const clickedExhibition = exhibitionInfo.filter(exhibition => exhibition.id === exhibitionId)[0];
    this.setState({
      currentPage: 'exhibitionDetails',
      detailsPage: clickedExhibition,
    })
  }

  render() {
    return (
      <div className="App">
        {/* <StickyContainer>
          <Sticky topOffset={-100}>
            {({ style }) => <h1 className="website-title" style={style} >Chelsea Art Gallery Exhibition List</h1>}
          </Sticky> */}
          <h1 className="website-title">Chelsea Art Gallery Exhibition List</h1>
          {this.state.currentPage === 'exhibitionList' && (
            <ExhibitionListPage
              setDetailsPage={this.setDetailsPage}
              exhibitionInfo={exhibitionInfo}
              dateValue={this.state.dateValue}
              locationValue={this.state.locationValue}
              changeDate={this.changeDate}
              changeLocation={this.changeLocation}
              viewAll={this.viewAll}
              clearDate={this.clearDate}
            />
          )}
          {this.state.currentPage === 'exhibitionDetails' && (
            <ExhibitionDetailsPage
              goBack={this.goBack}
              setDetailsPage={this.setDetailsPage}
              clickedDetails={this.state.detailsPage}
            />
          )}
        {/* </StickyContainer> */}
      </div>
    )
  }
}

export default App;
