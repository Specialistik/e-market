
import React from 'react';
import {render} from 'react-dom';

class Categories extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div id="content" class="wrapp_content">
            <div class="box_title_button">
                <h3 class="title_line"><span>Категория товара</span></h3>
            </div>

            <form action="/products/search/" method="get" class="wrapp_filter">
                <div class="wrapp_search">
                    <input type="text" name="search_string">
                    <button class="search_btn">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>

            <div class="wrapp_products">

                <div class="row_products clearfix">
                    {% for category in categories %}
                        <figure class="col_products category_products" data-mh="col-products">
                            <div class="products_img" data-mh="products-img">
                                <a href="/category/{{ category.id }}/">
                                    <img src="{{ category.get_image_url }}" alt="{{ category.name }}">
                                </a>

                                {% if user.profile.role == 'customer' %}
                                    <div class="products_count">
                                        {{ category.unseen }}
                                    </div>
                                {% endif %}
                            </div>

                            <figcaption>
                                <h3 class="light_grey products_title">{{ category.name }}</h3>
                            </figcaption>
                        </figure>
                    {% endfor %}

                    <div class="wrapp_products_list">
                        <ul class="products_list">
                            {% for category in categories %}
                                <li>
                                    <a href="/category/{{ category.id }}/">
                                        <span><img src="{{ category.get_image_url }}"></span>
                                        {{ category.name }}
                                    </a>
                                </li>
                            {% endfor %}
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    }
}
