import React from "react";
import ProfilePic from "../Assets/mosobelo.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Without Food ..The human existence will come an halt ...Oceans will dry up..
          People will across the Globe .. So Order Food And Eat..... #Seshabo
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          As Ramokoena says : Food is the important aspect of lives ..... Connect with Us Eat And Grow ....#Jaha#Seshabo
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Mosobelo Ramokoena</h2>
      </div>
    </div>
  );
};

export default Testimonial;
