import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/events';
// import {getMovies} from '../../actions/movies';

export class ChooseMovies extends Component {
    state = {
        group: '',
        event_name: '',
        event_location: '',
        event_start_vote_time: null,
        event_end_vote_time: null,
        event_time: null,
        movie_list: [],
    };

    
    static PropTypes = {
        createEvent: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    closeChooseMoviesPopUp = e => {
        e.preventDefault();
        
        // Hide Choose Movies popup
        document.getElementById("choose-movies").classList.add("d-none");
    };

    searchMovies = e => {
        e.preventDefault();

        let nameSearchReq = new XMLHttpRequest();
        const searchString = document.getElementById("search-name").value;

        // Clear previous search
        document.getElementById("movie-list").innerHTML = "";

        nameSearchReq.open("Get", "https://api.themoviedb.org/3/search/movie?api_key=f53857424b1f37f6e29ec176d40a4856&query=" + searchString);
        nameSearchReq.send();
        nameSearchReq.onload = () => {
            if(nameSearchReq.status === 200) {
                var movieList = [];
                var length = 20;
                var nameSearchRes = JSON.parse(nameSearchReq.response);

                if(nameSearchRes.results.length < 20) {
                    length = nameSearchRes.results.length;
                }

                new Promise(function(resolve) {
                    for(var i = 0; i < length; i++) {
                        let trailerSearchReq = new XMLHttpRequest();
                        trailerSearchReq.open("Get", "https://api.themoviedb.org/3/movie/" + nameSearchRes.results[i].id + "/trailers?api_key=f53857424b1f37f6e29ec176d40a4856")
                        trailerSearchReq.send();
                        trailerSearchReq.onload = function() {
                            var trailerSearchRes = JSON.parse(trailerSearchReq.response);
                            var youTubeLink = "Not available";
    
                            // Get YouTube link
                            if(trailerSearchRes.youtube.length) {
                                youTubeLink = "http://youtube.com/watch?v=" + trailerSearchRes.youtube[0].source;
                            }
                            var movie = {movie_id: nameSearchRes.results[this.i].id,
                                         movie_title: nameSearchRes.results[this.i].title,
                                         movie_youtubeLink: youTubeLink}
                            movieList.push(movie);
    
                            // Got all trailers. Display search results
                            if(this.i == length - 1) {
                                resolve(movieList);
                            }
                        }.bind({i: i});
                    }
                }).then(function(movieList) {
                    this.setState({ movie_list: movieList });
                    // this.state.movie_list = movieList;
                }.bind(this));
                
            } else {
                console.log(`Error ${nameSearchReq.status} ${nameSearchReq.statusText}`);
            }
        }

        // this.props.getMovies();
    };

    render() {
        return (
            <div id="choose-movies" className="card card-body d-none fixed-top h-100 mb-4 position-absolute w-100">
                <h2>Choose Movies</h2>
                <form>
                    <div className="form-group">
                        <label className="mb-0 mt-1">Search by name</label>
                        <input 
                            className="form-control"
                            id="search-name"
                            type="text"
                            placeholder="Movie name"
                            name="movie_name"
                        />
                    </div>
                 
                    <div className="form-group">
                        <button
                            className="btn btn-outline-info"
                            onClick={this.searchMovies}
                        >
                            <i className="fas fa-search" style={{marginRight:"5px", color:"#be79df"}}></i>
                            Search
                        </button>
                    </div>

                    <ul id="movie-list" >
                        {console.log(this.state.movie_list)}
                        {this.state.movie_list.map(movie=>{
                            return (<Fragment>
                                <li>
                                    {movie.movie_id}<br></br>
                                    {movie.movie_title}<br></br>
                                    {movie.movie_youtubeLink}<br></br>
                                    <ReactPlayer url={movie.movie_youtubeLink}/>
                                </li><br></br>
                                </Fragment>);
                            })
                        }
                    </ul>

                    <div className="form-group">
                        <button
                            className="btn btn-outline-info"
                            onClick={this.closeChooseMoviesPopUp}
                        >
                            <i className="fas fa-plus-circle" style={{marginRight:"5px", color:"#be79df"}}></i>
                            OK
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // movies: state.movies,
    // reactPlayer: <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
})

export default connect(mapStateToProps, { createEvent })(ChooseMovies);
