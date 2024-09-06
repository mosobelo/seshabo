import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Pick Meals",
      text: "Seshabo fast driven food deliveries throughout the Kingdom of Lesotho #Lijo #Seshabo.",
    },
    {
      image: ChooseMeals,
      title: "Choose How Often",
      text: "Choosing is not Just a Choice .. It is a lifestyle #Lijo ...#Seshabo",
    },
    {
      image: DeliveryMeals,
      title: "Fast Deliveries",
      text: "Connect with us .. Click the Button.. Grab Yourself A meal #Lijo #Seshabo",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Seshabo connecting to you All Over the Kingdom of Lesotho ... 
          Delivering foods in the lowlands and the kingdom of lesotho...
          #Seshabo #Lijo
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
