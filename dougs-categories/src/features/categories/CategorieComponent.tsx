import "../../styles/features/categories/CategorieComponent.css";
interface ICategorieProps {
  wording: string;
  description: string;
}

export function CategorieComponent(props: ICategorieProps) {
  return (
    <>
      <p className="categorie-wording">{props.wording}</p>
      <p className="categorie-description">{props.description}</p>
    </>
  );
}
