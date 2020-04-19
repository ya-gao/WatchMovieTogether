import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents, createVote } from '../../actions/events';

export class Events extends Component {
    state = {
        choice: '',
        winning_movie: ''
    };

    static PropTypes = {
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired
    };

    componentDidMount() {
        var groupId = location.hash.substr(location.hash.indexOf("=") + 1);
        this.props.getEvents(groupId);
    }

    getReviews() {
        this.movies.forEach(movie => {
            let reviewsSearchReq = new XMLHttpRequest();

            // Clear reviews
            const movies = document.getElementsByClassName("reviews" + movie.movie_id);
            for(var i = 0; i < movies.length; i++) {
                movies[i].innerHTML = "";
            }

            // Get reviews
            reviewsSearchReq.open("Get", "https://api.themoviedb.org/3/movie/" + movie.movie_id + "/reviews?api_key=f53857424b1f37f6e29ec176d40a4856")
            reviewsSearchReq.send();
            reviewsSearchReq.onload = function() {
                const reviewsSearchRes = JSON.parse(reviewsSearchReq.response);
                if(reviewsSearchRes.results.length) {
                    reviewsSearchRes.results.forEach(review => {
                        for(var i = 0; i < movies.length; i++) {
                            movies[i].innerHTML += '<li>' + review.content + '</li>';
                        }
                    });
                } else {
                    for(var i = 0; i < movies.length; i++) {
                        movies[i].innerHTML += '<li class="font-weight-bold text-danger">NO REVIEWS AVAILABLE</li>';
                    }
                }
                
            };
        });
    }

    onChange = e => {
        console.log(e.target.value);
        this.setState({ choice: e.target.value });
    }

    onSubmit = (event_id, e) => {
        e.preventDefault();
        const { choice } = this.state;
        this.props.createVote(choice, event_id);
        this.setState({choice: ''});
    };

    render() {
        return (
            <Fragment>
                <h2 id="events-header">Events</h2>
                <div id="events-list" className="container">
                    <div className="row">
                    {
                        this.props.events.map(event => {
                            const voteModalID = "voteModal" + (event.id).toString();
                            const modalTarget = "#" + voteModalID;

                            return (
                                <Fragment key={event.id}>
                                    <div className="col-4 mb-3">
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between">
                                                {event.event_name}
                                            </div>
                                            
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="fas fa-map-marker-alt" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Location: {event.event_location}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="far fa-calendar" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Event Time: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'}).format(new Date(event.event_time))}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-start" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Start Vote Date: {new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'}).format(new Date(event.event_start_vote_time))}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-end" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        End Vote Date: {new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'}).format(new Date(event.event_end_vote_time))}
                                                    </li>
                                                </ul>

                                                {
                                                    new Date(event.event_start_vote_time) > new Date()
                                                    ?
                                                    ''
                                                    :
                                                    <button 
                                                        className="btn btn-outline-info btn-sm btn-block"
                                                        data-toggle="modal" data-target={modalTarget}
                                                        onClick={this.getReviews.bind(event)}
                                                        style={{marginTop: "10px"}}
                                                    >
                                                        {" "}  
                                                        {new Date(event.event_end_vote_time) < new Date() ? "View vote result" : "Vote"}
                                                    </button> 
                                                }

                                                
                                            </div>   
                                        </div>
                                    </div>
                                    
                                    <div className="modal fade" id={voteModalID} role="dialog">
                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    {
                                                        new Date(event.event_end_vote_time) < new Date()
                                                        ?
                                                        <h5 className="modal-title" id="voteModalLabel">Vote period has ended</h5>
                                                        :
                                                        <h5 className="modal-title" id="voteModalLabel">Choose a movie from the list</h5>
                                                    }
                                                    
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={this.onSubmit.bind(this, event.id)}>
                                                        <input type="hidden" name="event_id" value={event.id} />
                                                        <div className="form-group">
                                                            <label htmlFor="event_name" className="col-form-label">Event:</label>
                                                            <input type="text" name="event_name" className="form-control" value={event.event_name} readOnly />
                                                            {new Date(event.event_end_vote_time) < new Date() 
                                                                ? 
                                                                ''
                                                                : 
                                                                <label htmlFor="movies_list" className="col-form-label">Movies:</label>
                                                            }
                                                            
                                                            <form name="movies_list">
                                                                {   
                                                                    new Date(event.event_end_vote_time) < new Date()
                                                                    ?
                                                                    this.props.events.filter(function(event) {
                                                                        return "voteModal" + event.id == voteModalID;
                                                                    }).map(event=> {
                                                                        let winningMovie;
                                                                        let maxVotes = 0;
                                                                        let voteObj = {}
                                                                        let voteObjArr = [];

                                                                        // Initialize voteObjArr
                                                                        event.movies.forEach(movie=>{
                                                                            voteObjArr.push({
                                                                                count: 0,
                                                                                movie_id: movie.movie_id,
                                                                                movie_title: movie.movie_title
                                                                            });
                                                                        }
                                                            
                                                                        )
                                                                        event.votes.forEach(vote => {
                                                                            const numVotes = event.votes.filter(mVote => {
                                                                                return mVote.movie == vote.movie;
                                                                            }).length;

                                                                            // Keep count of votes
                                                                            if(voteObj[vote.movie]) {
                                                                                voteObj[vote.movie].count++;
                                                                            } else {
                                                                                voteObj[vote.movie] = {
                                                                                    count: 1
                                                                                };
                                                                            }

                                                                            if(numVotes > maxVotes) {
                                                                                maxVotes = numVotes;
                                                                                winningMovie = vote.movie;
                                                                            }
                                                                        });

                                                                        // Get movie title
                                                                        for(var movie in voteObj) {
                                                                            if (Object.prototype.hasOwnProperty.call(voteObj, movie)) {
                                                                                voteObj[movie].movie_title = event.movies.find(mMovie => {
                                                                                    return mMovie.movie_id == movie;
                                                                                }).movie_title;
                                                                            }
                                                                        }

                                                                        // Push count to voteObjArr
                                                                        for(var movie in voteObj) {
                                                                            if (Object.prototype.hasOwnProperty.call(voteObj, movie)) {
                                                                                voteObjArr.find(vote => {
                                                                                    return vote.movie_id == movie;
                                                                                }).count = voteObj[movie].count;
                                                                            }
                                                                        }

                                                                        let winner = event.movies.find(movie => {
                                                                            return movie.movie_id == winningMovie;
                                                                        });
                                                                        
                                                                        
                                                                        return (
                                                                            <Fragment>
                                                                                <p className="font-weight-bold h3 mt-3"><b>Winning Movie:</b> {winner.movie_title}</p>
                                                                                <label htmlFor="vote-results" className="col-form-label font-weight-bold">Vote Results:</label>
                                                                                <ul name="vote-results">
                                                                                    {voteObjArr.map(vote => {
                                                                                        return (
                                                                                            <li><b>Movie:</b> {vote.movie_title}, <b>Votes:</b> {vote.count}</li>
                                                                                        )
                                                                                    })}
                                                                                </ul>
                                                                                
                                                                            </Fragment>
                                                                        )
                                                                    })
                                                                    
                                                                    :
                                                                    this.props.events.find(function(event) {
                                                                        return "voteModal" + event.id == voteModalID;
                                                                    }).movies.map(movie => {
                                                                        return (
                                                                            <Fragment>
                                                                                <div className="mb-3" style={{borderBottom: "1px solid #EEE"}}>
                                                                                    <input className="mr-1" type="radio" name="choice" value={movie.movie_id} onChange={this.onChange} />
                                                                                    <p className="d-inline font-weight-bold h5">{movie.movie_title}</p>
                                                                                    <div className="ml-3 mt-1">
                                                                                        {movie.movie_review_link == "TRAILER NOT AVAILABLE" ? <p className="font-weight-bold mb-0 text-danger">TRAILER NOT AVAILABLE</p> : <ReactPlayer height="270px" url={movie.movie_review_link} width="480px"/>}
                                                                                        <label htmlFor="reviews" className="col-form-label">Reviews:</label>
                                                                                        <ul className={"overflow-auto reviews" + movie.movie_id} name="review" style={{maxHeight: "20rem"}}></ul>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                            </Fragment>
                                                                        )
                                                                    })
                                                                }
                                                            </form>
                                                        </div>
                                                        <hr />
                                                        {
                                                            new Date(event.event_end_vote_time) < new Date()
                                                            ?
                                                            ''
                                                            :
                                                            <input type="submit" value="Vote" className="btn btn-block btn-secondary"  data-dismiss="modal"/>
                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>                      
                        );})
                    }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    events: state.events.events
})

export default connect(mapStateToProps, { getEvents, createVote})(Events);
