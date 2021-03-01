import React, { Component } from "react";
import "./style.css";
import Exhibition from "../Exhibition"

class ExhibitionList extends Component {
    render() {
        return (
            <div className="exhibition-info-list-container">
                {this.props.exhibitionInfo.length === 0 && <h3>No exhibition found.</h3>}
                {this.props.exhibitionInfo.map((exhibition) => {
                    return (
                        <Exhibition
                            key={exhibition.id}
                            id={exhibition.id}
                            galleryName={exhibition.galleryName}
                            artistName={exhibition.artistName}
                            startDate={exhibition.startDate}
                            endDate={exhibition.endDate}
                            openingReception={exhibition.openingReception}
                            setDetailsPage={this.props.setDetailsPage}
                        />
                    )
                })}
            </div>
        )
    }
}

export default ExhibitionList;