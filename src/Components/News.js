import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  
  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    console.log(parseData);
    props.setProgress(70)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  
  useEffect(() => {
    document.title = `NewsFeed - ${props.category.charAt(0).toUpperCase() + props.category.substring(1)}`;
    updateNews();
  }, [])

  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }

  // handlePrevious = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0', marginTop: '90px' }}>NewsFeed - Top {props.category.charAt(0).toUpperCase() + props.category.substring(1)} Headlines </h1>
      <div className="spinnig">
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={ <Spinner />}
      >
        <div className="container">
          <div className="row" >
            {articles.map((element) => {

              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 120) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <br />
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} rel="noreference" onClick={this.handlePrevious} type="button" className="btn btn-dark">&#8592; Prev</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / props.pageSize)} rel="noreference" onClick={this.handleNext} type="button" className="btn btn-dark">Next &#8594;</button>
        </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
