import React, { useEffect } from "react";
import "../../assets/features/categories/List.css";
import getVisibleCategories from "../../services/CategorieService";

function List() {
  useEffect(() => {
    getVisibleCategories();
  }, []);

  return (
    <>
      <p>
        Ceci est un test pour vérifier la
        couleurssflmsdkmmmmmmmmmslmdkfmslkfmsldfkmsldfksdmlkfsmldfksm d'arrière
        plan
      </p>
      <p>
        Ceci est un test pour vérifier la
        couleurssflmsdkmmmmmmmmmslmdkfmslkfmsldfkmsldfksdmlkfsmldfksm d'arrière
        plan
      </p>
    </>
  );
}

export default List;
