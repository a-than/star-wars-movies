import React, { Component} from 'react';
import axios from 'axios';
import  {episodeNameById} from './EpisodeName.js';
import MoviesTable from './MoviesTable';

class App extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        data: [],
        filteredData: [],
        selected: [],
        isMovieSelected: false,
        description: 'No movie selected',
        term: '',
        showSort: false
    };

    componentDidMount() {
        const url = "https://star-wars-api.herokuapp.com/films";

        axios.get(url)
            .then( result => {
                const data = result.data.map(film => {
                   return {...film, "name": episodeNameById[film.id].name};
                });
                this.setState({
                    data: data,
                    filteredData: data
                });
            });
    }

    onSearchChange(term) {
        const searchResults = this.state.data.filter(film => {
            let filmNameToLower = film.fields.title.toLowerCase();
            if(filmNameToLower.includes(term.toLowerCase())) {
                return film;
            }
        });

        this.setState({
            term: term,
            filteredData: searchResults
        });
    }

    handleClick = ( e  => {
      const desc = e.currentTarget.getAttribute('data-id');
      // this.setState({description: this.state.data[desc].fields.opening_crawl});
      this.setState({
          isMovieSelected:  true,
          selected: this.state.data[desc]
      });
    });

    showSort = (e => {
       e.preventDefault();
       this.setState(prevState => ({
           showSort: !prevState.showSort
       }));
    });

    closeSort = (e => {
        e.preventDefault();
        this.setState({
            showSort: false
        });
    });

    sortByEpisode = (e => {
        e.preventDefault();
        this.setState({
           filteredData: this.state.filteredData.sort(this.compareByName)
       })
    });

    compareByName = ((a, b) => {
       if(a.name < b.name)
           return -1;
       if(a.name > b.name)
           return 1;
       return 0;
    });

    sortByDate = (e => {
        e.preventDefault();
        this.setState({
            filteredData: this.state.filteredData.sort(this.compareByDate)
        })
    });

    compareByDate = ((a,b) => {
       return new Date(a.fields.release_date) - new Date(b.fields.release_date);
    });

    render() {
        return (
            <div className="container">
                <section className="search-sort">
                    <button onClick={this.showSort}>Sort by...</button>
                    {
                        this.state.showSort ? (
                            <div className="dropdown">
                                <div className="sort-header">
                                    <p>Sort by</p>
                                    <span className="close-icon"><i id="close" className="fa fa-times fa-lg" onClick={this.closeSort}></i></span>
                                </div>
                                <ul >
                                    <li onClick={this.sortByEpisode}>Episode</li>
                                    <li onClick={this.sortByDate}>Year</li>
                                </ul>
                            </div>
                        ) : (
                            null
                        )
                    }


                    <div className="search-box">
                        <div className="search-container">
                            <span className="icon"><i className="fa fa-search"></i></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="Type to search..."
                                value={this.state.term}
                                onChange={e => this.onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
                <section className="main">
                    <div className="movies">
                        <MoviesTable data = {this.state.filteredData} handleClick = {this.handleClick} />
                    </div>
                    <div className="details">
                        {
                            this.state.isMovieSelected ? (
                                <div className="movie-selected">
                                    <h1>{this.state.selected.fields.title}</h1>
                                    <p>{this.state.selected.fields.opening_crawl}</p>
                                    <div>Directed by: {this.state.selected.fields.director}</div>
                                </div>
                            ) : (
                                <div className="details-initial">{this.state.description}</div>
                            )
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default App;