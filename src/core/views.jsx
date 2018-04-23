
import React from 'react';
import {render} from 'react-dom';

import { Link } from 'react-router-dom';

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
        this.loadCategories = this.loadCategories.bind(this);
        this.loadSubCategories = this.loadSubCategories.bind(this);
    }

    async loadCategories() {
        let data = await (await fetch("/api/categories/")).json(); 
        this.setState(data);
    }

    async loadSubCategories(pid) {
        let data = await (await fetch("/api/subcategories/" + pid + '/')).json(); 
        //await fetch("/api/subcategories/" + pid + '/').then(response => this.setState({
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
                                <Link to={'/subcategories/' + category.id}>
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
                                    <Link to={'/subcategories/' + category.id}> 
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
        console.log('subcat constructor', props);
        super(props);
        this.state = {
            categories: [],
            pid: this.props.match.params.pid
        }

    }
/*
    componentDidMount() {
      const { match: { params } } = this.props;

      axios.get(`/api/users/${params.userId}`)
        .then(({ data: user }) => {
          console.log('user', user);

          this.setState({ user });
        });
    }
*/
    render() {
        return <Categories pid={this.state.pid} />
    }
}