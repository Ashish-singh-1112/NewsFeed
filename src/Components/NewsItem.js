import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className="card my-3" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex: '1'}}>
            {source}
          </span>
        <img src={imageUrl ? imageUrl : "https://techcrunch.com/wp-content/uploads/2022/12/gift-guide-22-favorite-things.jpg?resize=1200,645"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>

      </div>
    )
  }
}

export default NewsItem
