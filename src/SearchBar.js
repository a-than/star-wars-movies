import React, { Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onInputChange(term) {
        this.setState ({
           term: term
        });
        this.props.onSearchChange(term);
    }

    render() {
        return (
            <div className="search-container">
                <span className="icon"><i className="fa fa-search"></i></span>
                <input
                    type="search"
                    id="search"
                    placeholder="Type to search..."
                    value={this.state.term}
                    onChange={e => this.onInputChange(e.target.value)}
                />
            </div>
        );
    }
}

export default SearchBar;