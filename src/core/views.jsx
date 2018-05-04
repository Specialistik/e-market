
import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import ROLES from '../auth/actions';

const hiddenStyle = {
    display: 'none',
};

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
            pid: (props.match && props.match.params.pid !== null) ? props.match.params.pid : null,
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
        if (this.state.pid === null) {
            this.fetchCats("/api/categories/");
        } else {
            this.fetchCats("/api/categories/" + this.state.pid + '/');
        }
    }

    render() {
        return <div id="content" className="wrapp_content">
            { this.state.pid ? 
                <div className="box_title_button">
                    <h3 className="title_line"><span>{ this.state.cat_name }</span></h3>

                    <Link to='/categories/' pid={this.state.pid?null:this.state.pid} className="btn light_orange icon_right large_width">
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
                        <figure className="col_products category_products" data-mh="col-products" key={index}>
                            <div className="products_img" data-mh="products-img">
                                <Link to={(this.state.pid===null?'/categories/':'/products/') + category.id + '/'}>
                                    <img src={ category.image } />
                                    { category.name }
                                </Link>
                                { this.state.role == 'customer'? 
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
                            {this.state.categories.map((category, index) => (
                                <li key={index}>
                                    <Link to={(this.state.pid===null?'/categories/':'/products/') + category.id + '/'}>
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
            cat_id: (props.match) ? props.match.params.cat_id: null,
            isCustomerOrManager: (props.hasOwnProperty('role') && props.role in ('customer', 'manager')),
            category : {
                pid: null,
                name: ''
            },
        }
    }

    fetchProducts() {
        fetch("/api/products/" + this.state.cat_id + '/')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
                }).then((response) => response.json())
                    .then((products_entity) => this.setState({ 
                        category: products_entity.category, 
                        products: products_entity.products
                    }).catch((e) => this.setState({ hasErrored: true, error: e })))
                .catch((e) => this.setState({ hasErrored: true, error: e }))
            .catch((e) => this.setState({ hasErrored: true, error: e }))
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {
        return <div id="content" className="wrapp_content">
            <div className="box_title_button">
                <h3 className="title_line"><span>{ this.state.category.name }</span></h3>

                <Link to={"/categories/" + this.state.category.pid + '/'} className="btn light_orange icon_right large_width">
                    <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
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
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>

        <div className="wrapp_products"> 

            <div className="row_products clearfix">
                {this.state.products.map((product, index) => (
                    <figure className="col_products" data-mh="col-products" key={index}>
                        <div style={hiddenStyle} className="product_minimum_amount">{ product.minimum_amount }</div>
                        <div style={hiddenStyle} className="product_id">{ product.id }</div>
                        <div style={hiddenStyle} className="product_description">{ product.description }</div>
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

                            {this.state.isCustomerOrManager 
                                ? <div className="wrapp_btn center">
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

// Kinda skeleton for a navigation component as if it wasn't obvious
export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props
        }
    }

    render() {
        if (this.state.role === ROLES.SUPERVISOR) {
            return <div />
        } else {
            return <div> 
                <button className="navigation_btn">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button> 

                <nav id="nav" className="navigation">
                </nav>
            </div>
        }
        
    }
}