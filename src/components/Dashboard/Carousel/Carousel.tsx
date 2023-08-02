import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setres } from '../../../features/userdata';
const Carousels = () => {
  const banners = useSelector((state) => state.topbanner.value1);
  const minds = useSelector((state) => state.topbanner.value2);
  const res = useSelector((state) => state.topbanner.value3);
  const location = useSelector((state) => state.location.value);
  const user = useSelector((state) => state.user.value);
  console.log(banners);
  const filteredbanner = banners.slice(1);
  const filteredminds = minds.slice(1);
  const filteredres = res.slice(1);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="carousel">
        <h2 style={{ marginBottom: '10px' }}>Best Offers for You </h2>
        <Carousel responsive={responsive}>
          {filteredbanner.map((banner) => {
            return (
              <div
                style={{
                  backgroundColor: `${banner.backgroundColor}`,
                  color: `${banner.textColor}`,
                  width: '525px',
                  height: '252px',
                }}
                key={banner.id}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                    letterSpacing: '5px',
                    fontSize: '25px',
                    fontFamily: 'ProximaNova',
                  }}
                >
                  <p>{banner.altText.toUpperCase()}</p>
                  <p>{banner.altTextCta.toUpperCase()}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="carousel1">
        <h2 style={{ marginBottom: '10px' }}>Whats on Mind </h2>
        <Carousel responsive={responsive1}>
          {filteredminds.map((mind) => {
            return (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                }}
                key={mind.id}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    letterSpacing: '2px',
                    fontSize: '25px',
                    fontFamily: '',
                  }}
                >
                  <p>{mind.text}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
        <hr></hr>
      </div>
      <div className="carousel1">
        <h2 style={{ marginBottom: '20px' }}>
          {`Top Resturants in ${location.name}`}{' '}
        </h2>
        <Carousel responsive={responsive2}>
          {filteredres.map((mind) => {
            return (
              <div
                className="clash-card barbarian"
                key={mind.id}
                onClick={() => {
                  dispatch(
                    setres({
                      resturantid: mind.id,
                    }),
                  );
                  nav('/resturantmenu');
                }}
              >
                <div className="clash-card__level clash-card__level--barbarian">
                  &nbsp;
                </div>
                <div className="clash-card__unit-name">{mind.name}</div>
                <div className="clash-card__level clash-card__level--barbarian">
                  {`${mind.locality},${mind.areaname}`}
                </div>
                <div className="clash-card__unit-description">
                  {mind.cuisines.toString()}
                </div>

                <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
                  <div className="one-third">
                    <div className="stat">{mind.rating}</div>
                    <div className="stat-value">Rating</div>
                  </div>

                  <div className="one-third">
                    <div className="stat">{mind.cost}</div>
                  </div>
                  <div className="one-third">
                    <div className="stat">{mind.totalrating}</div>
                    <div className="stat-value">Total Rating</div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Carousels;
