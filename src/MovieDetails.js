import React, { Component} from 'react';

class MovieDetails extends Component {
    render() {
        return (
                this.props.isMovieSelected ? (
                <div className="movie-selected">
                    <h1>{this.props.selected.fields.title}</h1>
                    <p>{this.props.selected.fields.opening_crawl}</p>
                    <div>Directed by: {this.props.selected.fields.director}</div>
                </div>
            ) : (
                <div className="details-initial">{this.props.description}</div>
            )
        );
    }
}

export default MovieDetails;