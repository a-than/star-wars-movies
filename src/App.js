import React, { Component} from 'react';
import axios from 'axios';
import  {episodeNameById} from './EpisodeName.js';
import MoviesTable from './MoviesTable';
import MovieDetails from './MovieDetails';
import Dropdown from './Dropdown';
import SearchBar from "./SearchBar";

class App extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.sortByEpisode = this.sortByEpisode.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.closeSort = this.closeSort.bind(this);
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

    onSearchChange = (term => {
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
    })

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
                    <Dropdown
                        showSort = {this.state.showSort}
                        sortByEpisode = {this.sortByEpisode}
                        sortByDate = {this.sortByDate}
                        closeSort = {this.closeSort}
                    />


                    <div className="search-box">
                        <SearchBar
                            onSearchChange = {(term) => this.onSearchChange(term)}
                        />
                    </div>
                </section>
                <section className="main">
                    <div className="movies">
                        <MoviesTable data = {this.state.filteredData} handleClick = {this.handleClick} />
                    </div>
                    <div className="details">
                        <MovieDetails isMovieSelected = {this.state.isMovieSelected} selected = {this.state.selected} description = {this.state.description}/>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;