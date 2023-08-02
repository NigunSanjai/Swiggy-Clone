import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './Resturants.css';
import { setres } from '../../../features/userdata';

export const Resturants = () => {
  const resturants = useSelector((state) => state.resturants.value);
  const filteredresturants = resturants.slice(1);
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="grid">
        <h2 style={{ marginBottom: '20px' }}>Resturants near you</h2>
        <div className="grid-container" style={{ cursor: 'pointer' }}>
          {filteredresturants.map((ele) => {
            return (
              <div
                className="clash-card barbarian"
                key={ele.id}
                onClick={() => {
                  dispatch(
                    setres({
                      resturantid: ele.id,
                    }),
                  );
                  nav('/resturantmenu');
                }}
              >
                <div className="clash-card__level clash-card__level--barbarian">
                  &nbsp;
                </div>
                <div className="clash-card__unit-name">{ele.name}</div>
                <div className="clash-card__level clash-card__level--barbarian">
                  {`${ele.locality},${ele.areaName}`}
                </div>
                <div className="clash-card__unit-description">
                  {ele.cuisines.toString()}
                </div>

                <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
                  <div className="one-third">
                    <div className="stat">{ele.rating}</div>
                    <div className="stat-value">Rating</div>
                  </div>

                  <div className="one-third">
                    <div className="stat">{ele.cost}</div>
                  </div>
                  <div className="one-third">
                    <div className="stat">{ele.totalrating}</div>
                    <div className="stat-value">Total Rating</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
