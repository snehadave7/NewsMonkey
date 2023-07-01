import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    
    static defaultProps={
        country:"in",
        pageSize:12,
        category:'general'
        
    }
    static propTypes={
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string
    }
    
    constructor(props){
        super(props); // constructor will work only if we call super
        this.state={
            articles:[],
            loading: false,
            //page:1,
            totalResults:0
        }
        document.title= `${this.props.category} - NewsPandas`;
    }
    async componentDidMount(){

        this.updateNews()
    }
    async updateNews(){
        this.props.setProgress(10);
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a84ad0e4ddc4db88d986468a7f8e0db&page=${this.state.page} &pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data =await fetch(url);
        let parsedData= await data.json();
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false})
            this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page +1})
        
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a84ad0e4ddc4db88d986468a7f8e0db&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});    
        let data =await fetch(url);
            let parsedData= await data.json();
            this.setState({
                page:this.state.page+1,
                articles:this.state.articles.concat(parsedData.articles),
                totalResults:parsedData.totalResults,
                loading:false
            })
    };
    
    render(){

        return(
        <div className="container my-3" >
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px' }}>NewsPandas-{this.props.category} News</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<h4 loader></h4>}
        >
            <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title? element.title.slice(0,45):""} description={element.description? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                    </div>
                    })}
                 </div>
            </div>
        
        </InfiniteScroll>
       
      </div>
            
    )
}
} 




export default News