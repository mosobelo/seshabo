import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
// import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
    
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p className="primary-text">
            Lijo tse monate Re Chakele Mosotho wa hae heso... O tlo ja
            & lijo tse hahang sesole sa 'mele ...#Seshabo Lijo Bophelo ha boo ntle le lijo
          </p>
          {/* <button className="secondary-button">
            Order Now <FiArrowRight />{""}
          </button> */}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;