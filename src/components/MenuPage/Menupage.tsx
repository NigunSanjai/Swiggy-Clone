import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuupdate, resetmenu } from '../../features/resturants';
import DashHeader from '../Dashboard/Header/Header';
import './Menupage.css';
import Category from './Category';
const Menupage = () => {
  const user = useSelector((state) => state.user.value);
  const resturant = useSelector((state) => state.resturants.menu);

  const dmenudata = useSelector((state) => state.resturants.menu);
  console.log(dmenudata);

  const dispatch = useDispatch();
  const [showmheader, setshowmheader] = useState(true);
  const scrollpos = 300;
  const [mloading, ismloading] = useState('');
  useEffect(() => {
    dispatch(resetmenu({}));
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${user.latitude}&lng=${user.longitude}&restaurantId=${user.resturantid}&catalog_qa=undefined&submitAction=ENTER`,
      )
      .then((response) => {
        console.log(response);
        const resdata = response.data.data.cards[0].card.card.info;
        dispatch(
          menuupdate({
            id: resdata.id,
            name: resdata.name,
            city: resdata.city,
            locality: resdata.locality,
            areaName: resdata.areaName,
            cuisines: resdata.cuisines,
            rating: resdata.avgRatingString,
            totalrating: resdata.totalRatingsString,
            cost: resdata.costForTwoMessage,
            deliverytime: resdata.sla.slaString,
            distance: resdata.sla.lastMileTravelString,
          }),
        );
        const menudata =
          response.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
        for (let i = 2; i < menudata.length - 3; i++) {
          const category = menudata[i];
          const title = category.card.card.title;
          let items = [];
          if ('itemCards' in category.card.card) {
            items = category.card.card.itemCards;
          } else {
            items = category.card.card.categories[0].itemCards;
          }
          console.log(items);
          if (items === undefined) continue;
          items.map((item) => {
            dispatch(
              menuupdate({
                title: title,
                id: item.card.info.id,
                name: item.card.info.name,
                description: item.card.info.description,
                price: (Number(item.card.info.price) / 100).toFixed(2),
                category: item.card.info.itemAttribute.vegClassifier ?? '',
              }),
            );
          });
        }
        ismloading('true');
      });
  }, []);
  if (mloading == 'true') {
    console.log(dmenudata);
  }

  const handleScroll = () => {
    if (window.scrollY > scrollpos) {
      setshowmheader(false);
    } else {
      setshowmheader(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      {mloading === '' ? (
        <div></div>
      ) : (
        <div>
          {showmheader && <DashHeader />}
          {mloading === 'true' && <Resheader />}
          {mloading == 'true' &&
            dmenudata.slice(2, dmenudata.length).map((data) => {
              return <Category title={data.title} items={data.items} />;
            })}
        </div>
      )}
    </>
  );
};

export function Resheader() {
  const resturant = useSelector((state) => state.resturants.menu);
  console.log(resturant);
  return (
    <div className="size">
      <div className="RestaurantHeader_container__2XRhv1 snipcss-65cwX">
        <div className="RestaurantHeader_wrapper__2GTdS RestaurantHeader_marginBottom__1rbfK">
          <div className="RestaurantNameAddress_wrapper__24l_g">
            <div aria-hidden="true">
              <p className="RestaurantNameAddress_name__2IaTv">
                {resturant[0].name}
              </p>
              <p className="RestaurantNameAddress_cuisines__mBHr2">
                {resturant[0].cuisines.toString()}
              </p>
            </div>
            <div
              className="RestaurantNameAddress_areaWrapper__3HIxj"
              aria-label=""
            >
              <p
                className="RestaurantNameAddress_area__2P9ib"
                aria-hidden="true"
              >
                {`${resturant[0].areaName},${resturant[0].locality}`}
              </p>
              <p
                className="RestaurantNameAddress_lastMile__26BNf"
                aria-hidden="true"
              >
                {resturant[0].distance}
              </p>
            </div>
          </div>
          <button
            className="RestaurantRatings_wrapper__2294i"
            data-testid="restaurant-ratings-header"
            aria-hidden="true"
          >
            <span
              className="RestaurantRatings_avgRating__1TOWY"
              aria-hidden="true"
            >
              <span className="icon-star"></span>
              <span>{resturant[0].rating}</span>
            </span>
            <span
              className="RestaurantRatings_totalRatings__3d6Zc"
              aria-hidden="true"
            >
              {resturant[0].totalrating}
            </span>
          </button>
        </div>
        <ul></ul>
        <hr
          className="RestaurantHeader_dottedSeparator__2O2hU RestaurantHeader_marginBottom__1rbfK"
          aria-hidden="true"
        />
        <div
          className="RestaurantHeader_marginBottom__1rbfK"
          aria-hidden="true"
        >
          <ul className="RestaurantTimeCost_wrapper__3YXF9">
            <li className="RestaurantTimeCost_item__2HCUz">
              <svg
                className="RestaurantTimeCost_icon__8UdT4"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle
                  r="8.35"
                  transform="matrix(-1 0 0 1 9 9)"
                  stroke="#3E4152"
                  stroke-width="1.3"
                ></circle>
                <path
                  d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                  fill="#3E4152"
                ></path>
              </svg>
              <span>{resturant[0].deliverytime}</span>
            </li>
            <li className="RestaurantTimeCost_item__2HCUz">
              <svg
                className="RestaurantTimeCost_icon__8UdT4"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="8.25"
                  stroke="#3E4152"
                  stroke-width="1.5"
                ></circle>
                <path
                  d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
                  fill="#3E4152"
                ></path>
              </svg>
              <span>{resturant[0].cost}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menupage;
