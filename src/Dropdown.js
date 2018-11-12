import React, { Component} from 'react';

class Dropdown extends Component {
    render() {
        return (
            this.props.showSort ? (
                <div className="dropdown">
                    <div className="sort-header">
                        <p>Sort by</p>
                        <span className="close-icon"><i id="close" className="fa fa-times fa-lg" onClick={this.props.closeSort}></i></span>
                    </div>
                    <ul >
                        <li onClick={this.props.sortByEpisode}>Episode</li>
                        <li onClick={this.props.sortByDate}>Year</li>
                    </ul>
                </div>
            ) : (
                null
            )
        );
    }
}

export default Dropdown;