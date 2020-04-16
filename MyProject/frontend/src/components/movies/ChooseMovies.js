import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/events';
import { createMovies } from '../../actions/movies';

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
        createEvent: PropTypes.func.isRequired,
        createMovies: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    closeChooseMoviesPopUp = e => {
        e.preventDefault();

        // Hide Choose movies pop-up
        document.getElementById("choose-movies").classList.add("d-none");
        document.getElementById("create-event").classList.remove("d-none");
        document.getElementById("events-header").classList.remove("d-none");
        document.getElementById("events-list").classList.remove("d-none");
    };

    searchMovies = e => {
        e.preventDefault();

        let nameSearchReq = new XMLHttpRequest();
        const searchString = document.getElementById("search-name").value;

        // Clear previous search
        this.setState({movie_list: []});

        nameSearchReq.open("Get", "https://api.themoviedb.org/3/search/movie?api_key=f53857424b1f37f6e29ec176d40a4856&query=" + searchString);
        nameSearchReq.send();
        nameSearchReq.onload = () => {
            if(nameSearchReq.status === 200) {
                const TRAILER_NOT_AVAILABLE_MSG = "TRAILER NOT AVAILABLE";
                var movieList = [];
                var length = 20;
                var nameSearchRes = JSON.parse(nameSearchReq.response);

                if(nameSearchRes.results.length < 20) {
                    length = nameSearchRes.results.length;
                }

                new Promise(function(resolve) {
                    let counter = 0;
                    for(var i = 0; i < length; i++) {
                        let trailerSearchReq = new XMLHttpRequest();
                        trailerSearchReq.open("Get", "https://api.themoviedb.org/3/movie/" + nameSearchRes.results[i].id + "/trailers?api_key=f53857424b1f37f6e29ec176d40a4856")
                        trailerSearchReq.send();
                        trailerSearchReq.onload = function() {
                            var trailerAvailable = false;
                            var trailerSearchRes = JSON.parse(trailerSearchReq.response);
                            var youTubeLink = TRAILER_NOT_AVAILABLE_MSG;
    
                            // Get YouTube link
                            if(trailerSearchRes.youtube.length) {
                                youTubeLink = "http://youtube.com/watch?v=" + trailerSearchRes.youtube[0].source;
                                trailerAvailable = true;
                            }


                            var movie = {movie_id: nameSearchRes.results[this.i].id,
                                         movie_overview: nameSearchRes.results[this.i].overview,
                                         movie_title: nameSearchRes.results[this.i].title,
                                         movie_year: nameSearchRes.results[this.i].release_date.substr(0, 4),
                                         movie_youtubeLink: youTubeLink}
                            movieList.push(movie);
    
                            counter++;
                            // Got all trailers. Display search results
                            if(counter == length) {
                                resolve(movieList);
                            }
                        }.bind({i: i});
                    }
                }).then(function(movieList) {
                    this.setState({ movie_list: movieList }, function() {
                        // Don't show trailer link if trailer is available
                        var trailerLinks = document.getElementsByClassName("youTubeLink");
                        for(var i = 0; i < trailerLinks.length; i++) {
                            if(trailerLinks[i].textContent == TRAILER_NOT_AVAILABLE_MSG) {
                                trailerLinks[i].classList.remove("d-none");
                            }
                        }
                    });
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
            <div id="choose-movies" className="card card-body d-none fixed-top mb-4 position-absolute w-100">
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

                    <div className="row" id="movie-list" >
                        {/* {console.log(this.state.movie_list)} */}
                        {this.state.movie_list.map(movie=>{
                            return (<Fragment>
                                <div className="bg-light col-6 mb-3 pb-3 pt-1" data-id={movie.movie_id} data-title={movie.movie_title}>
                                    <input className="mr-2" type="checkbox" id={movie.movie_id}/>
                                    <b>{movie.movie_title}</b> - {movie.movie_year}<br></br>
                                    <p className="mb-0 overflow-auto" style={{height: '4.5rem'}}>{movie.movie_overview}</p><br></br>
                                    <p className="d-none font-weight-bold text-danger youTubeLink">{movie.movie_youtubeLink}</p><br></br>
                                    <ReactPlayer height="270px" url={movie.movie_youtubeLink} width="480px"/>
                                </div><br></br>
                                </Fragment>);
                            })
                        }
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-outline-info"
                            onClick={this.closeChooseMoviesPopUp}
                        >
                            <i className="fas fa-plus-circle" style={{marginRight:"5px", color:"#be79df"}}></i>
                            Add to Event
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

export default connect(mapStateToProps, { createEvent,createMovies })(ChooseMovies);
