import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: (this.props.hasOwnProperty('match') && this.props.match.params.hasOwnProperty('pid') ? this.props.match.params.pid : null),
            categories: [],
            cat_name: ''
        };
        this.fetchCats = this.fetchCats.bind(this);
    }

    fetchCats(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            })
                .then((response) => response.json())
                    .then((cat_entity) => this.setState({
                            categories: cat_entity.categories,
                            cat_name: cat_entity.hasOwnProperty('current_cat') ? (cat_entity.current_cat) : '',
                        })
                    ).catch((e) => this.setState({ hasErrored: true, error: e }))
                .catch((e) => this.setState({ hasErrored: true, error: e }))
        .catch((e) => this.setState({ hasErrored: true, error: e }))
    }

    componentDidMount() {
        this.fetchCats("/api/categories/" + (this.state.pid ? this.state.pid + '/' : ''));
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.hasOwnProperty('pid')) {
            this.setState({pid: nextProps.match.params.pid});
            this.fetchCats("/api/categories/" + nextProps.match.params.pid + '/');
        } else {
            this.setState({pid: null});
            this.fetchCats("/api/categories/");
        }
     }

    render() {
        return <div id="content" className="wrapp_content">
            { this.state.pid ?
                <div className="box_title_button">
                    <h3 className="title_line"><span>{ this.state.cat_name }</span></h3>

                    <Link to={ '/categories/' } className="btn light_orange icon_right large_width">
                        <div className="fa fa-long-arrow-left" aria-hidden="true"/>
                        Назад к категориям
                    </Link>
                </div> :''
            }

            <form action="/products/search/" method="get" className="wrapp_filter">
                <div className="wrapp_search">
                    <input type="text" name="search_string" />
                    <button className="search_btn">
                        <i className="fa fa-search" aria-hidden="true" />
                    </button>
                </div>
            </form>

            <div className="wrapp_products">
                <div className="row_products clearfix">
                    {this.state.categories.map((category, index) => (
                        <figure className="col_products category_products" data-mh="col-products" key={ index }>
                            <div className="products_img" data-mh="products-img">
                                <Link to={ (!this.state.pid ? '/categories/' : '/products/') + category.id + '/'}>
                                    <img src={ category.image } />
                                    { category.name }
                                </Link>
                                { this.props.role === 'customer'?
                                    <div className="products_count">
                                        { category.unseen }
                                    </div>:''
                                }
                            </div>

                            <figcaption>
                                <h3 className="light_grey products_title"> { category.name }</h3>
                            </figcaption>
                        </figure>
                    ))}

                    <div className="wrapp_products_list">
                        <ul className="products_list">
                            { this.state.categories.map((category, index) => (
                                <li key={index}>
                                    <Link to={ (!this.state.pid ? '/categories/' : '/products/') + category.id + '/'}>
                                        <span><img src={ category.image } /></span>
                                        { category.name }
                                    </Link>
                                </li>
                              ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

export default connect(
    mapStateToProps,
    null
)(Categories);