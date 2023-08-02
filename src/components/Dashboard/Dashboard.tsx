import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  update,
  updatemind,
  toprest,
  resettop,
} from '../../features/topbanner';
import DashHeader from './Header/Header';
import Carousels from './Carousel/Carousel';
import {
  menuupdate,
  resetmenu,
  resetres,
  resturants,
} from '../../features/resturants';
import { Resturants } from './Resturants/Resturants';
// import Carousels from './Carousel/Carousel';

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);

  const [showheader, setshowheader] = useState(true);
  const scrollpos = 800;
  const dispatch = useDispatch();
  const [loading, isloading] = useState(true);
  useEffect(() => {
    dispatch(resetmenu({}));
    dispatch(resetres({}));
    dispatch(resettop({}));
    axios
      .get(`https://www.swiggy.com/dapi/restaurants/list/v5`, {
        params: {
          lat: `${user.latitude}`,
          lng: `${user.longitude}`,
          page_type: 'DESKTOP_WEB_LISTING',
        },
      })
      .then((response) => {
        console.log(response.data);
        // Example usage:

        const resarray =
          response.data.data.cards[0].card.card.gridElements.infoWithStyle.info;
        const whatsonmind =
          response.data.data.cards[1].card.card.gridElements.infoWithStyle.info;
        const topres =
          response.data.data.cards[2].card.card.gridElements.infoWithStyle
            .restaurants;
        const resgrid =
          response.data.data.cards[5].card.card.gridElements.infoWithStyle
            .restaurants;
        console.log(topres);

        function checktime(given: string): string {
          const currentTime: Date = new Date();
          const givenTime: Date = new Date(given);

          const currentHour: number = currentTime.getHours();
          const givenHour: number = givenTime.getHours();

          return currentHour <= givenHour ? 'Open' : 'Closed';
        }

        resarray.map((ele) => {
          const randomHexCode = getRandomHexCode();
          const oppositeHexCode = getOppositeHexCode(randomHexCode);
          dispatch(
            update({
              id: ele.id,
              altText: ele.accessibility.altText,
              altTextCta: ele.accessibility.altTextCta,
              backgroundColor: randomHexCode,
              textColor: oppositeHexCode,
            }),
          );
        });
        whatsonmind.map((ele) => {
          dispatch(
            updatemind({
              id: ele.id,
              text: ele.action.text,
            }),
          );
        });
        topres.map((ele) => {
          dispatch(
            toprest({
              id: ele.info.id,
              name: ele.info.name,
              locality: ele.info.locality,
              areaname: ele.info.areaName,
              cuisines: ele.info.cuisines,
              rating: ele.info.avgRatingString,
              totalrating: ele.info.totalRatingsString,
              cost: ele.info.costForTwo,
              action: `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${user.latitude}&lng=${user.longitude}&restaurantId=${ele.info.id}&catalog_qa=undefined&submitAction=ENTER`,
            }),
          );
        });
        resgrid.map((ele) => {
          const oporclose = checktime(ele.info.sla.deliveryTime);
          dispatch(
            resturants({
              id: ele.info.id,
              name: ele.info.name,
              locality: ele.info.locality,
              areaName: ele.info.areaName,
              cost: ele.info.costForTwo,
              cuisines: ele.info.cuisines,
              rating: ele.info.avgRatingString,
              totalrating: ele.info.totalRatingsString,
              deliverytime: oporclose,
            }),
          );
        });

        isloading(false);
      });
  }, []);
  const handleScroll = () => {
    if (window.scrollY > scrollpos) {
      setshowheader(false);
    } else {
      setshowheader(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const banner = useSelector((state) => state.topbanner.value1);
  const filteredbanner = banner.slice(1);
  console.log(filteredbanner);
  function getRandomHexCode(): string {
    let hexCode = '#';
    const characters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      hexCode += characters[Math.floor(Math.random() * 16)];
    }
    return hexCode;
  }

  function getOppositeHexCode(hexCode: string): string {
    let oppositeCode = '#';
    const characters = '0123456789ABCDEF';
    for (let i = 1; i < 7; i++) {
      const currentDigit = hexCode.charAt(i);
      const oppositeDigit = characters[15 - characters.indexOf(currentDigit)];
      oppositeCode += oppositeDigit;
    }
    return oppositeCode;
  }

  // function view() {
  //   console.log(banner.value);
  // }
  // ?lat=18.5362084&lng=73.8939748&page_type=DESKTOP_WEB_LISTING`
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          {showheader && <DashHeader />}
          <Carousels />
          <Resturants />
        </div>
      )}
    </>
  );
};

export default Dashboard;
