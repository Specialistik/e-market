import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ModalProduct from './modal-product.jsx';

const hiddenStyle = {
    display: 'none',
};

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            products: [],
            product_description: {
                price: 0,
                image: ''
            },
            category: {
                pid: null,
                name: ''
            },
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(product) {
        console.log('open modal product value is ', product);
        this.setState({ open: true, product_description: product });
    };

    closeModal(event, product) {
        event.preventDefault();
        this.setState({ open: false, product_description: null });
    };

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
        return <div id="content" className="wrapp_content">
            <div className="box_title_button">
                <h3 className="title_line"><span>{ this.state.category.name }</span></h3>

                <Link to={"/categories/" + this.state.category.pid + '/'} className="btn light_orange icon_right large_width">
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
                                <Link to="javascript;" className="modal_desc_product btn_popup" onClick={() => this.openModal(product)}>
                                    <img className="img_url" src={ product.image } alt="{ product.name }"/>
                                </Link>
                            </div>

                            <figcaption>
                                <h3 className="slight_grey products_title">
                                    <span className="product_name">{ product.name }</span>
                                    <span className="products_subtitle">{ product.weight } кг</span>
                                </h3>

                                { this.props.role && this.props.role in ['customer', 'manager'] ?
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

            <ModalProduct product={this.state.product_description} open={this.state.open} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        role: state.userReducer['role'],
        token: state.userReducer['token'],
    }
};

export const ProductsContainer = connect(
    mapStateToProps,
    null
)(Products);