
import React from 'react';
import {render} from 'react-dom';

class BackToCats extends React.Component {
    constructor(props) {
        super(props);
        this.setState({category: props.category});
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

export class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.setState = {
            categories: [],
            pid: props.pid || null
        };
        this.loadCategories = this.loadCategories.bind(this);
        this.loadSubCategories = this.loadSubCategories.bind(this);
    }

    async loadCategories() {
        let data = await (await fetch("/api/categories/")).json(); //then(response => this.setState({categories: response.json().categories}));
        this.setState(data);
        //return data
    }

    async loadSubCategories() {
        await fetch("/api/subcategories/" + this.state.pid + '/').then(response => this.setState({
            categories: response.json().categories,
            current_cat: response.json().current_cat
        }));
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
                                <a href={'/subcategories/' + category.id + '/'}>
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
                                    <a href={"/subcategories/" + category.id + "/"}>
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


export class Subcategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            pid: props.pid
        }
    }

    render() {
        return <Categories pid={this.state.pid} />
    }
}