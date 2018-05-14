
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CoreActionCreators from './actions';

const hiddenStyle = {
    display: 'none',
};

export class Header extends React.Component {
    render() {
        return <header id="header" className="header_wrapp clearfix">
            <div className="header_inner claerfix">
                <div className="logo">
                    <Link to="/">
                        <img src="/static/images/small-logo.png" alt=""/>
                    </Link>
                </div>

                <div className="header_right_box">
                    {this.props.role !== null && this.props.role in ['customer', 'manager'] ?
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">14</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count" id="basket">88</span> руб
                        </div>
                    </div> :''}

                    {this.props.role !== null && this.props.role === 'manager' ?
                    <div className="basket_wrapp">
                        <a href="/basket" className="basket_box">
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="basket_item">14</span>
                        </a>

                        <div className="basket_box_count">
                            <span className="basket_count">88</span> руб
                        </div>

                    </div> :''}

                    <Link to='/profile/' href="/profile/" className="wrapp_company_logo clearfix">
                        <span className="company_logo">
                            <img src="/static/images/icons/user-icon.png" alt=""/>
                        </span>

                        <span className="company_name">
                            Моя компания
                        </span>
                    </Link>

                    <Link to='/logout' className="out_btn">
                        Выйти
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
        </header>
    }
};

export class Navigation extends React.Component {
    render() {
        return this.props.role !== 'supervisor' ?
            <div>
                <button className="navigation_btn">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button> 
                <nav id="nav" className="navigation">
                    <div className="user_navigation">
                        {this.props.role in ('customer', 'manager') ?
                            <div className="basket_wrapp">
                                <a href="/basket" className="basket_box">
                                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                    <span className="basket_item">14</span>
                                </a>
        
                                <div className="basket_box_count">
                                    <span className="basket_count">88</span> руб
                                </div>
        
                            </div>
                        :''}
                    </div>
                </nav>
            </div>
        :''
    }
}

class CategoryTitle extends React.Component {
    render() {
        return <div className="box_title_button">
            <h3 className="title_line"><span>Категория товара</span></h3>
        </div>
    }
}

export class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.fetchCats("/api/categories/" + (this.props.hasOwnProperty('match') ? this.props.match.params.pid + '/' : ''));
    }

    render() {
        return <div id="content" className="wrapp_content">
            { this.props.hasOwnProperty('match') ? 
                <div className="box_title_button">
                    <h3 className="title_line"><span>{ this.state.cat_name }</span></h3>

                    <Link to={ '/categories/' + this.props.match.params.pid + '/' } className="btn light_orange icon_right large_width">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        Назад к категориям
                    </Link>
                </div> :''
            }
            
            <form action="/products/search/" method="get" className="wrapp_filter">
                <div className="wrapp_search">
                    <input type="text" name="search_string" />
                    <button className="search_btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>

            <div className="wrapp_products">
                <div className="row_products clearfix">
                    {this.state.categories.map((category, index) => (
                        <figure className="col_products category_products" data-mh="col-products" key={ index }>
                            <div className="products_img" data-mh="products-img">
                                <Link to={ (!this.props.hasOwnProperty('match')?'/categories/':'/products/') + category.id + '/'}>
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
                                    <Link to={ (this.props.hasOwnProperty('match') ? '/categories/' : '/products/') + category.id + '/'}>
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

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category : {
                pid: null,
                name: ''
            },
        }
    }

    fetchProducts() {
        fetch("/api/products/" + this.props.match.params.cat_id + '/')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
                }).then((response) => response.json())
                    .then((products_entity) => this.setState({ 
                            category: products_entity.category, 
                            products: products_entity.products
                        })).catch((e) => this.setState({ hasErrored: true, error: e }))
                .catch((e) => this.setState({ hasErrored: true, error: e }))
            .catch((e) => this.setState({ hasErrored: true, error: e }))
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {
        console.log('rendering of products, state and props are', this.state, this.props);
        return <div id="content" className="wrapp_content">
            <div className="box_title_button">
                <h3 className="title_line"><span>{ this.state.category.name }</span></h3>

                <Link to={"/categories/" + this.props.match.params.cat_id + '/'} className="btn light_orange icon_right large_width">
                    <i className="fa fa-long-arrow-left" aria-hidden="true"/>
                        Назад к подкатегориям
                </Link>
            </div>

            <form action="/products/search/" method="get" className="wrapp_filter">
                <label className="label1 big">Сортировка:</label>

                <div className="wrapp_castom_select sorting">
                    <select data-placeholder="По умолчанию" id="product_sort" name="sorting">
                        <option value="1">По умолчанию</option>
                        <option value="2">По категории</option>
                        <option value="3">По подкатегории</option>
                        <option value="4">По цене</option>
                    </select>
                </div>

                <div className="wrapp_search">
                    <input type="text" name="search_string"/>
                    <button className="search_btn">
                        <i className="fa fa-search" aria-hidden="true"/>
                    </button>
                </div>
            </form>

        <div className="wrapp_products"> 

            <div className="row_products clearfix">
                {this.state.products.map((product, index) => (
                    <figure className="col_products" data-mh="col-products" key={index}>
                        <div style={ hiddenStyle } className="product_minimum_amount">{ product.minimum_amount }</div>
                        <div style={ hiddenStyle } className="product_id">{ product.id }</div>
                        <div style={ hiddenStyle } className="product_description">{ product.description }</div>
                        <div className="products_img" data-mh="products-img">
                            <a href="#product1" className="modal_desc_product btn_popup">
                                <img className="img_url" src={ product.image } alt={ product.name }/>
                            </a>
                        </div>

                        <figcaption>
                            <h3 className="light_grey products_title">
                                <span className="product_name">{ product.name }</span>
                                <span className="products_subtitle">{ product.weight } кг</span>
                            </h3>

                            { this.props.role && this.props.role in ('customer', 'manager') ? 
                                <div className="wrapp_btn center">
                                    <span className="products_price">{ product.price }р</span>
                                    <a href="javascript:;" className="btn btn_basket light_orange add_to_cart">В корзину</a>
                                </div>:''
                            }
                        </figcaption>
                    </figure>
                ))}
            </div> 
        </div>
    </div>
    }
}

const mapStateToProps = state => {
    return {
        role: state.role,
        token: state.token
    }
}
/*
const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(CoreActionCreators, dispatch) }
}
*/

export default connect(
    mapStateToProps,
    null
)(Categories, Products);
