import React, { useState } from 'react';

import './Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { addcart, deletecart, updatecart } from '../../features/cart';
// Implemented kind of CRUD operations on the cart Redux Store

// For the restaurant which is selected, the complete restaurat data is passed as props to this component
// This Component is used to display the Menu of the Restaurant with adding and removing items from the cart
// All the items are maintained in the Restaurant Redux Store

const Category = (props) => {

  const carts = useSelector((state) => state.cart.value);
  const [expand, setexpand] = useState(true);
  const dispatch = useDispatch();
  return (
    <div className="menudisplay">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{props.title}</h3>
          {expand ? (
            <h3
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setexpand(false);
              }}
            >
              Expand
            </h3>
          ) : (
            <h3
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setexpand(true);
              }}
            >
              Close
            </h3>
          )}
        </div>

        {props.items.map((item) => {
          return expand ? (
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
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Category;
