import React from 'react'
import defaultImage from './image1.png'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="card my-3" >
      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
        <span className="badge rounded-pill bg-success">
          {source}
        </span>
      </div>
      <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>

    </div>
  )
}

export default NewsItem;
