import React from "react";
import "./style.css";


const Exhibition = (props) => {
  const setDetailsPage = () => {
    props.setDetailsPage(props.id)
  }
  return (
    <div className="exhibition-info-container">
      {props.openingReception &&
        <p className="opening-reception">✔︎</p>
      }
      <h3 className="gallery-name" onClick={setDetailsPage}>{props.galleryName}</h3>
      <h4 className="artist-name">{props.artistName}</h4>
      <p className="date">{props.startDate} - {props.endDate}</p>
    </div>
  )
}

export default Exhibition;