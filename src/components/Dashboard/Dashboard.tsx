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

// Thsi is the main Dashboard Component which comes into action once the user is logged in

const Dashboard = () => {
  const user = useSelector((state) => state.user.value); // This is the Redux State to get the user details
  const [showheader, setshowheader] = useState(true); // This is the state to show the header
  const scrollpos = 800;
  const dispatch = useDispatch();
  const [loading, isloading] = useState(true); // This is the state to make the screen blank until the data is fetched from the API
  useEffect(() => {
    dispatch(resetmenu({}));
    dispatch(resetres({}));
    dispatch(resettop({}));
    // This is the API call to fetch the data from the API
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
          response.data.data.cards[0].card.card.gridElements.infoWithStyle.info; // This is the array which holds the banner data
        const whatsonmind =
          response.data.data.cards[1].card.card.gridElements.infoWithStyle.info; //This is the array which holds the What's on your mind data
        const topres =
          response.data.data.cards[2].card.card.gridElements.infoWithStyle
            .restaurants; // This is the array which holds the Top Resturants data
        const resgrid =
          response.data.data.cards[5].card.card.gridElements.infoWithStyle
            .restaurants; // This is the array which holds the Resturants data
        // console.log(topres);
        
        //The below function is to check the time and return the status of the resturant
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
          //The below dispatch is to update the banner data
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
        //The below function is to take every element from the array and dispatch it to the Topbanner Redux store
        whatsonmind.map((ele) => {
          dispatch(
            updatemind({
              id: ele.id,
              text: ele.action.text,
            }),
          );
        });

        //The below function is to take every element from the array and dispatch it to the Topbanner Redux store
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
        //The below function is to take every element from the array and dispatch it to the Resturants Redux store
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
  // This is the function to handle the scroll and show the header
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
  //Since by defaut an empty object is passed to the Redux store, the below code is to remove the empty object
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
  //The above two functions are to generate random colors for the banner one to generate the color for the background and the other to generate the color for the text


  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          {showheader && <DashHeader />}
          <Carousels /> 
          {/* Displays the Carousel dealing with the Banner WhatsonMind and Top Resturants */}
          <Resturants />
          {/* Displays the Resturants */}
        </div>
      )}
    </>
  );
};

export default Dashboard;
