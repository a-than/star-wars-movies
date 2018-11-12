import React, { Component} from 'react';

class MoviesTable extends Component {
    render() {
        return (
            <table >
                {this.props.data.map((film, index) => {
                    return (
                        <tr key={index} data-id={index} onClick={this.props.handleClick}>
                            <td className="small-text">{film.name}</td>
                            <td>{film.fields.title}</td>
                            <td className="td-right">{film.fields.release_date}</td>
                        </tr>
                    )
                })}
            </table>
        );
    }
}

export default MoviesTable;