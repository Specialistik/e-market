import React from 'react';

export default class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('modal product props are', this.props.product, ' is open ', this.props.open);
        return this.props.product ?
        <div className="box-modal modal_popup_product big" style={{ display: this.props.open ? 'block' : 'none'}}>
            <div className="modal_container2">

                <form action="/order_unit/add/" method="POST">
                    <input name="product" id="popup_product_id" type="hidden" value=""/>
                    <h3 className="popup_title light_grey align_left" id="popup_product_name"/>

                    <div className="wrapp_product_preview">

                        <div className="product_preview_img">
                            <img id="popup_product_url" src={ this.props.product.image } alt=""/>
                        </div>

                        <div className="product_preview_desc">
                            <div className="row">
                                <div className="col-sm-12 col-xs-6">
                                    <label className="label1 big">
                                        Наличие:
                                    </label>

                                    <p className="check_label">Есть в наличии</p>

                                    <label className="label1 big">
                                        Минимальный заказ:
                                    </label>

                                    <span className="sublabel" id="popup_minimum_amount">от 100 шт</span>

                                    <p className="popup_price"><span id="popup_price">{ this.props.product.price }</span></p>
                                </div>

                                <div className="col-sm-12 col-xs-6">
                                    <label className="label1 big">
                                        Выберите количество:
                                        <span id="popup_tooltip_desc" className="tooltip_desc" data-tooltip-txt="Минимальный заказ: от 100 шт" data-tooltip-pos="right">?</span>
                                    </label>

                                    <input id="amount" name="amount" type="number" required value="" min="100" step="100" data-mask="99999" className="number_type_btn"/>
                                    <div className="clearfix"> </div>
                                    <button className="btn btn_basket light_orange">В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>:''
    }
}