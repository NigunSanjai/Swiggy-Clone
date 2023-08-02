import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cartpage.css';
import { addcart, deletecart, updatecart } from '../../features/cart';
import DashHeader from '../Dashboard/Header/Header';
// Since cart is accessible from all the pages, it is maintained as a seperate component
const Cartpage = () => {
  const carts = useSelector((state) => state.cart.value);
  const filteredcarts = carts.slice(1);
  const totalPrice = filteredcarts.reduce(
    (accumulator, item) => accumulator + Number(item.totalprice),
    0,
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="cartdisplay">
        <DashHeader />
        <h3>Your Cart</h3>
        {filteredcarts.map((item) => {
          return (
            <div
              className="styles_container__-kShr snipcss-XqBjk"
              data-testid="normal-dish-item"
              key={item.id}
            >
              <div className="styles_item__3_NEAs styles_hasImage__3OsYts">
                <div className="styles_detailsContainer__22vh8">
                  <div className="styles_itemName__hLfgz" aria-hidden="true">
                    <h3 className="styles_itemNameText__3ZmZZ">{item.name}</h3>
                  </div>
                  <div
                    className="styles_itemPortionContainer__1u_tj"
                    aria-hidden="true"
                  >
                    <span
                      className="styles_price__2xrhD styles_itemPrice__1Nrpd styles_s__66zLz"
                      aria-hidden="true"
                    >
                      <span className="rupee">&#8377;{item.price}</span>
                    </span>
                  </div>
                  <div
                    className="styles_itemDesc__3vhM0 style-b1KBm"
                    aria-hidden="true"
                    id="style-b1KBm"
                  >
                    {item.description}
                  </div>
                </div>
                <div className="styles_itemImageContainer__3Czsd">
                  <div className="styles_itemAddButton__zJ7-R">
                    <div className="_3L1X9 _211P0 main_buttonInner__z6Jz0 main_button__3gpqi">
                      <div className="_1RPOp _36fT9 _4aKW6">ADD</div>
                      <div
                        className="_1ds9T _2Thnf"
                        onClick={() => {
                          const index = carts.findIndex(
                            (i) => i.id === item.id,
                          );
                          if (index === -1) {
                            dispatch(
                              addcart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                              }),
                            );
                          } else {
                            dispatch(
                              updatecart({
                                id: item.id,
                              }),
                            );
                          }
                        }}
                      >
                        +
                      </div>
                      <div
                        className="_29Y5Z _2od4M"
                        onClick={() => {
                          dispatch(
                            deletecart({
                              id: item.id,
                            }),
                          );
                        }}
                      ></div>
                      <div className="_2zAXs _18lJJ">
                        {' '}
                        {carts.findIndex((i) => i.id === item.id) === -1
                          ? 'O'
                          : carts[carts.findIndex((i) => i.id === item.id)]
                              .quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Total Amount </h3>
          <h3>&#8377;{totalPrice}</h3>
        </div>
      </div>
    </>
  );
};
// User can add or remove items from the cart according to which the total price is calculated
export default Cartpage;
