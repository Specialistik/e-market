import React from 'react';

export class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    openModal() {
        this.setState({ open: true });
    };

    closeModal() {
        this.setState({ open: false });
    };

    render() {
        return <div ClassName="box-modal modal_popup_product big" id="product_popup" style={{ display: this.state.open ? 'block' : 'none'}}>
            <div ClassName="modal_container2">

                <form action="/order_unit/add/" method="POST">
                    <input name="product" id="popup_product_id" type="hidden" value=""/>
                    <h3 ClassName="popup_title light_grey align_left" id="popup_product_name"></h3>

                    <div ClassName="wrapp_product_preview">

                        <div ClassName="product_preview_img">
                            <img id="popup_product_url" src={ this.props.img } alt=""/>
                        </div>

                        <div ClassName="product_preview_desc">
                            <div ClassName="row">
                                <div ClassName="col-sm-12 col-xs-6">
                                    <label ClassName="label1 big">
                                        Наличие:
                                    </label>

                                    <p ClassName="check_label">Есть в наличии</p>

                                    <label ClassName="label1 big">
                                        Минимальный заказ:
                                    </label>

                                    <span ClassName="sublabel" id="popup_minimum_amount">от 100 шт</span>

                                    <p ClassName="popup_price"><span id="popup_price">{ this.props.price }</span></p>
                                </div>

                                <div ClassName="col-sm-12 col-xs-6">
                                    <label ClassName="label1 big">
                                        Выберите количество:
                                        <span id="popup_tooltip_desc" ClassName="tooltip_desc" data-tooltip-txt="Минимальный заказ: от 100 шт" data-tooltip-pos="right">?</span>
                                    </label>

                                    <input id="amount" name="amount" type="number" required value={ this.props.amount } min="100" step="100" data-mask="99999" ClassName="number_type_btn"/>
                                    <div ClassName="clearfix"></div>
                                    <button ClassName="btn btn_basket light_orange">В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}