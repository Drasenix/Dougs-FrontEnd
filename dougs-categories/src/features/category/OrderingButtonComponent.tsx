import React from "react";
import "../../styles/features/category/OrderingButtonComponent.css";
import { OrderingTypes } from "./CategoryMenuComponent";
import alphabetical from "../../assets/img/features/category/list/ordered/alphabetically/alphabetical-order.png";
import alphabetical_active from "../../assets/img/features/category/list/ordered/alphabetically/alphabetical-order-active.png"; //
import group from "../../assets/img/features/category/list/ordered/group/group.png";
import group_active from "../../assets/img/features/category/list/ordered/group/group-active.png";

interface IOrderingButtonComponentProps {
  ordering: OrderingTypes;
  changeOrdering: Function;
  isActive: boolean;
}

interface IAttributes {
  class: string;
  src: string;
  alt: string;
  text: string;
}

function OrderingButtonComponent(props: IOrderingButtonComponentProps) {
  let attributes: IAttributes;
  switch (props.ordering) {
    case OrderingTypes.Group:
      attributes = {
        class: props.isActive
          ? "group-categories-btn category-order-active"
          : "group-categories-btn category-order-inactive",
        src: props.isActive ? group_active : group,
        alt: props.isActive
          ? "(Actif) Boutton qui permet de regrouper les catégories par groupes"
          : " (Inactif) Boutton qui permet de regrouper les catégories par groupes",
        text: "Groupe de catégorie",
      };

      break;
    case OrderingTypes.Alphabetical:
      attributes = {
        class: props.isActive
          ? "alphabetical-order-categories-btn category-order-active"
          : "alphabetical-order-categories-btn category-order-inactive",
        src: props.isActive ? alphabetical_active : alphabetical,
        alt: props.isActive
          ? "(Actif) Boutton qui permet de trier les catégories par ordre alphabétique"
          : "(Inactif) Boutton qui permet de trier les catégories par ordre alphabétique",
        text: "Ordre alphabétique",
      };
      break;
  }

  return (
    <button
      className={attributes.class}
      onClick={() => props.changeOrdering(props.ordering)}
    >
      <img
        className="category-order-btn-img"
        src={attributes.src}
        alt={attributes.alt}
      />
      <p className="category-order-btn-text">{attributes.text}</p>
    </button>
  );
}

export default OrderingButtonComponent;
