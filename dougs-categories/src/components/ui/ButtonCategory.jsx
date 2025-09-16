import React from "react";
import "../../assets/components/ui/ButtonCategory.css";

function ButtonCategory(props) {
  return (
    <button className={props.class}>
      <img className="category-order-btn-img" src={props.src} alt={props.alt} />
      <p className="category-order-btn-text">{props.text}</p>
    </button>
  );
}

export default ButtonCategory;
