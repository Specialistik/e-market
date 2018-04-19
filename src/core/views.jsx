
import React from 'react';
import {render} from 'react-dom';

class BackToCats extends React.Component {
    constructor(props) {
        super(props);
        state = {category: props.category}
    }

    render() {
        return <div class="box_title_button">
            <h3 class="title_line"><span>{ this.category.name }</span></h3>

            <a href="/categories" class="btn light_orange icon_right large_width">
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

class Categories extends React.Component {
    constructor(props) {
        super(props);
        state = {
            categories: [],
            pid: props.pid || null
        }
    }

    async loadCategories() {
        let json_response = await fetch("/api/categories/").then(response =>response.json()),
        
        this.setState({
            categories: ajson_response.categories
        })
    }

    async loadSubCategories() {
        let json_response = await fetch("/api/subcategories/" + this.state.pid + '/').then(response =>response.json()),
        this.setState({
            categories: json_response.categories,
            current_cat: json_response.current_cat
        })
    }
 
    componentDidMount() {
        if (this.state.pid === null) {
            this.loadCategories();
        } else {
            this.loadSubCategories();
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
                                <a href={'/category/' + category.id + '/'}>
                                    <img src="{ category.image }" alt="{ category.name }"/>
                                </a>
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
                                    <a href={"/category/" + category.id + "/"}>
                                        <span><img src={category.image}/></span>
                                        { category.name }
                                    </a>
                                </li>
                              ))}
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    }
}


class Subcategories extends React.Component {
    constructor(props) {
        super(props);
        state = {
            categories: [],
            pid: props.pid
        }
    }

    render() {
        return <Categories pid={this.state.pid} />
    }
}