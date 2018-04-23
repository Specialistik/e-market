
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
        this.state = {
            category: props.category
        };
    }

    render() {
        return <div class="box_title_button">
            <h3 class="title_line"><span>{ this.category.name }</span></h3>

            <a href={<Link to='categories'/>} class="btn light_orange icon_right large_width">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                Назад к категориям
            </a>
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
            pid: props.pid || null
        };
        this.setState(userStore.getState());
        this.loadCategories = this.loadCategories.bind(this);
        this.loadSubCategories = this.loadSubCategories.bind(this);
    }

    async loadCategories() {
        let data = await (await fetch("/api/categories/")).json(); 
        this.setState(data);
    }

    async loadSubCategories(pid) {
        let data = await (await fetch("/api/categories/" + pid + '/')).json(); 
        this.setState({
            categories: data.categories,
            current_cat: data.current_cat
        });
    }
 
    componentDidMount() {
        if (this.state.pid === null) {
            this.loadCategories();
        } else {
            this.loadSubCategories(this.state.pid);
        }
    }

    render() {
        return <div id="content" className="wrapp_content">
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
                                <Link to={(this.state.pid===null?'/categories/':'/products/') + category.id}>
                                    <img src={ category.image } alt={ category.name }/>
                                    { category.name }
                                </Link>
                            </div>

                            <figcaption>
                                <h3 className="light_grey products_title"> {category.name}</h3>
                            </figcaption>
                        </figure>
                    ))}

                    <div className="wrapp_products_list">
                        <ul className="products_list">
                            {this.state.categories.map((category, index) => (
                                <li>
                                    <Link to={(this.state.pid===null?'/categories/':'/products/') + category.id}>
                                        <span><img src={ category.image } alt={ category.name }/></span>
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
            cat_id: this.props.match.params.cat_id,
            isCustomerOrManager: (userStore.getState().role === 'customer' || userStore.getState().role === 'manager'),
            category : {
                id: null,
                name: ''
            }, 
            products: []
        }
        //this.loadProducts = this.loadProducts.bind(this);
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
                <h3 class="title_line"><span>{ this.state.category.name }</span></h3>

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
                                <img class="img_url" src={ product.get_image_url } alt={ product.name }/>
                            </a>
                        </div>

                        <figcaption>
                            <h3 class="light_grey products_title">
                                <span class="product_name">{ product.name }</span>
                                {/*
                                {% if product.weight %}<span class="products_subtitle">{{ product.weight }} кг</span>{% endif %}
                                */}
                            </h3>

                            {this.state.isCustomerOrManager ?<div className="wrapp_btn center">
                                <span class="products_price">{ product.producer_price }р</span>
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