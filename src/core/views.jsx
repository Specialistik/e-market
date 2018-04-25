
import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import { Link } from 'react-router-dom';
import userStore from '../store';

const hiddenStyle = {
    display: 'none',
};

class BackToCats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cat_name: props.cat_name || null};
    }

    render() {
        return <div class="box_title_button">
            <h3 class="title_line"><span>{ this.state.cat_name }</span></h3>

            <Link to='categories' class="btn light_orange icon_right large_width">
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                Назад к категориям
            </Link>
        </div>
    }
}

class CategoryTitle extends React.Component {
    constructor(props) {
        super(props);
    }

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
            pid: (props.match)?props.match.params.pid:null,
            cat_name: '',
        };
        this.fetchCats = this.fetchCats.bind(this);
    }
   
    fetchCats(url) {
        //todo: implement scroll, hasErrored
        this.setState({isLoading: true});
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            }).then((response) => response.json())
            .then((cat_array, current_cat) => this.setState({ 
                categories: cat_array.categories, 
                cat_name: current_cat || null}))
            .catch(() => this.setState({ hasErrored: true }))
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

            {/* TODO: fix that after I calm down
            { if (this.state.pid) ? 
                 <BackToCats cat_name={this.state.cat_name} />
            }
            */}

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
                    {/* 
                    {% if user.profile.role == 'customer' %}
                        <div className="products_count">
                            {{ category.unseen }}
                        </div>
                    {% endif %}
                        */}
                    {this.state.categories.map((category, index) => (
                        <figure className="col_products category_products" data-mh="col-products">
                            <div className="products_img" data-mh="products-img">
                                <Link to={(this.state.pid===null?'/categories/':'/products/') + category.id + '/'}>
                                    <img src={ category.image } />
                                    { category.name }
                                </Link>
                            </div>

                            <figcaption>
                                <h3 className="light_grey products_title"> { category.name }</h3>
                            </figcaption>
                        </figure>
                    ))}

                    <div className="wrapp_products_list">
                        <ul className="products_list">
                            {this.state.categories.map((category, index) => (
                                <li>
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


export class Subcategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            pid: this.props.match.params.pid
        }
    }

    render() {
        return <Categories pid={this.state.pid} />
    }
}

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cat_id: this.props.match.params.cat_id || null,
            isCustomerOrManager: (userStore.getState().role === 'customer' || userStore.getState().role === 'manager'),
            
            category : {
                id: null,
                name: ''
            }, 

            products: []
        }
    }

    componentDidMount() {
        axios.get("/api/products/" + this.state.cat_id + '/')
        .then(res => {
            this.setState({ category: res.data.category, products: res.data.products });
        })
    }

    render() {
        return <div id="content" className="wrapp_content">
            <div class="box_title_button">
                {/*<h3 class="title_line"><span>{ this.state.category.name }</span></h3>*/}

                <Link to={"/categories/" + this.state.category.pid} className="btn light_orange icon_right large_width">
                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                        Назад к подкатегориям
                </Link>
            </div>
            

            <form action="/products/search/" method="get" class="wrapp_filter">
                <label class="label1 big">Сортировка:</label>

                <div class="wrapp_castom_select sorting">
                    <select data-placeholder="По умолчанию" id="product_sort" name="sorting">
                        <option value="1">По умолчанию</option>
                        <option value="2">По категории</option>
                        <option value="3">По подкатегории</option>
                        <option value="4">По цене</option>
                    </select>
                </div>

                <div class="wrapp_search">
                    <input type="text" name="search_string"/>
                    <button class="search_btn">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>

        <div class="wrapp_products"> 

            <div class="row_products clearfix">
                {this.state.products.map((product, index) => (
                    <figure class="col_products" data-mh="col-products">
                        <div style={hiddenStyle} class="product_minimum_amount">{ product.minimum_amount }</div>
                        <div style={hiddenStyle} class="product_id">{ product.id }</div>
                        <div style={hiddenStyle} class="product_description">{ product.description }</div>
                        <div class="products_img" data-mh="products-img">
                            <a href="#product1" class="modal_desc_product btn_popup">
                                <img class="img_url" src={ product.image } alt={ product.name }/>
                            </a>
                        </div>

                        <figcaption>
                            <h3 class="light_grey products_title">
                                <span class="product_name">{ product.name }</span>
                                <span class="products_subtitle">{ product.weight } кг</span>
                            </h3>

                            {this.state.isCustomerOrManager ?<div className="wrapp_btn center">
                                <span class="products_price">{ product.price }р</span>
                                <a href="javascript:;" class="btn btn_basket light_orange add_to_cart">В корзину</a>
                            </div>:''}

                        </figcaption>
                    </figure>
                ))}
            </div> 
        </div>

    </div>
    }
}