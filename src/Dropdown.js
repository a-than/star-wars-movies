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

    showSort =(() => {
        const nextShow = !this.state.showSort;
        this.setState({
            showSort: nextShow
        }, () => {
            document.addEventListener('click',this.closeSort);
        });
    });

    closeSort(e) {
        if(this.dropdownMenu && !this.dropdownMenu.contains(e.target)) {
            this.setState({
                showSort: false
            }, () => {
                document.removeEventListener('click', this.closeSort);
            });
        }
    }

    render() {
        return (
            <div ref={(element) => {
                this.dropdownMenu = element;
            }}>
                <button onClick={this.showSort}>Sort by...</button>
                {
                    this.state.showSort ? (
                        <div className="dropdown" >
                            <div className="sort-header">
                                <p>Sort by</p>
                                <span className="close-icon"><i id="close" className="fa fa-times fa-lg"
                                                                onClick={this.showSort}></i></span>
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