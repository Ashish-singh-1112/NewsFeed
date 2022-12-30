import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0
    }
    document.title = `NewsFeed - ${this.props.category.charAt(0).toUpperCase() + this.props.category.substring(1)}`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=364de2aca31d4d8cb722d76e67e07905&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }

  // handlePrevious = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  fetchMoreData = async () => {

    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=364de2aca31d4d8cb722d76e67e07905&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    })
  };

  render() {
    // console.log("render")
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0' }}>NewsFeed - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.substring(1)} Headlines </h1>
        <div className="spinnig">
          {this.state.loading && <Spinner />}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={!this.state.loading && <Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row" >
              {this.state.articles.map((element) => {

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
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} rel="noreference" onClick={this.handleNext} type="button" className="btn btn-dark">Next &#8594;</button>
        </div> */}
      </>
    )
  }
}

export default News
