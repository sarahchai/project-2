import React, { Component } from "react";
import "./style.css";


class ExhibitionDetailsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wikiText: '',
      wikiUrl: '',
      artsyShows: [],
      artsyArtworks: [],
    }
  }

  componentDidMount = async () => {
    const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&origin=*&search=${this.props.clickedDetails.artistName}`
    const wikipediaResponse = await fetch(wikipediaUrl)
    const wikipediaData = await wikipediaResponse.json();
    this.setState({
      wikiText: wikipediaData[2][0],
      wikiUrl: wikipediaData[3][0],
    })

    const artsyUrl = `https://api.artsy.net/api/search?q=${this.props.clickedDetails.artistName}`
    const artsyResponse = await fetch(artsyUrl, {
      headers: {
        "X-Access-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjZmYjZkMDRkMTNlODZlOTgwNTlmMGQiLCJzYWx0X2hhc2giOiJkODNjZjFlNGQzYWU0NTkwNmZkZmRiNmU1ZDJmMmVkNSIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoyMzQ2MTgzODkyLCJpYXQiOjE1NTcxNzkwOTIsImF1ZCI6IjUzZmYxYmNjNzc2ZjcyNDBkOTAwMDAwMCIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1Y2QwYWFkNDg3MzU4NTY5MmVlMzkyNDAifQ.pOAr7RvhLiuYOxig0FTV3Kd6XwL0oc5mgyvLoIJLJ2w"
      }
    })

    
    const artsyData = await artsyResponse.json();
    console.log(artsyData)
    const artsyShows = artsyData._embedded.results.filter(result => result.type === "show")
    const artsyArtworks = artsyData._embedded.results.filter(result => result.type === "artwork")
    this.setState({
      artsyShows: artsyShows,
      artsyArtworks: artsyArtworks,
    })
  }
  render() {
    const { galleryName, galleryAddress, openingHours, openingDays, exhibitionTitle, artistName, startDate, endDate, openingReception, link } = this.props.clickedDetails

    return (
      <div className="exhibition-details-page">
        <input className="goback-button" type="button" value="Go Back" onClick={this.props.goBack}></input>
        <div className="details-container">
          <h2 className="gallery name">{galleryName}</h2>
          <p className="gallery address">{galleryAddress}</p>
          <p className="gallery hours">Hours: {openingDays} ({openingHours})</p>
          <h3 className="exhibition title">{exhibitionTitle}</h3>
          <h4 className="exhibition artist">{artistName}</h4>
          <p className="exhibition date">{startDate} - {endDate}</p>
          <a className="exhibition link" href={link} target="_blank" >Learn more about the exhibition</a>
          {openingReception &&
            <p className="exhibition opening" >*Opening Reception: {openingReception}</p>
          }
          <div className="wiki-data">
            <h4 className="wiki-text">{this.state.wikiText}</h4>
            <a className="wiki-link" href={this.state.wikiUrl} target="_blank">Learn more about the arist</a>
          </div>
        </div>
        <div className="artsy-data">
          <div className="artwork-container">
            {this.state.artsyArtworks.length > 0 && <h2 className="heading artworks">Artworks</h2>}
            {this.state.artsyArtworks.map(artwork => {
              return (
                <div className="artwork">
                  <img className="artwork-image" src={artwork._links.thumbnail.href} alt="artwork" ></img>
                  <div className="artwork-text">
                    <h3>{artwork.title}</h3>
                    <p>{artwork.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="show-container">
            {this.state.artsyShows.length > 0 && <h2 className="heading previous-shows">Previous Shows</h2>}
            {this.state.artsyShows.map(show => {
              return (
                <div className="show">
                  <img className="show-image" src={show._links.thumbnail.href} alt="show"></img>
                  <h3>{show.title}</h3>
                  <a className="show-link" href={show._links.permalink.href} target="_blank">Learn more about the show</a>
                </div>
              )
            })}
          </div>
        </div>
        <input className="goback-button" type="button" value="Go Back" onClick={this.props.goBack}></input>
      </div>
    )
  }
}

export default ExhibitionDetailsPage;