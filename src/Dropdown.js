import React, { Component} from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSort: false
        };

        this.showSort = this.showSort.bind(this);
        this.closeSort = this.closeSort.bind(this);
    }

    showSort(e) {
        e.preventDefault();
        this.setState({
            showSort: true
        }, () => {
            document.addEventListener('click',this.closeSort);
        });
    }

    closeSort(e) {
        if(this.dropdownMenu && !this.dropdownMenu.contains(e.target)) {
            this.setState({
                showSort: false
            }, () => {
                document.removeEventListener('click', this.closeSort);
            });
        }
    }

    forceClose = (e => {
       e.preventDefault();
        this.setState({
          showSort: false
       });
    });


    render() {
        return (
            <div>
                <button onClick={this.showSort}>Sort by...</button>
                {
                    this.state.showSort ? (
                        <div className="dropdown" ref={(element) => {
                            this.dropdownMenu = element;
                        }}>
                            <div className="sort-header">
                                <p>Sort by</p>
                                <span className="close-icon"><i id="close" className="fa fa-times fa-lg"
                                                                onClick={this.forceClose}></i></span>
                            </div>
                            <ul>
                                <li onClick={this.props.sortByEpisode}>Episode</li>
                                <li onClick={this.props.sortByDate}>Year</li>
                            </ul>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        );
    }
}

export default Dropdown;