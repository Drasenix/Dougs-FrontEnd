import { Categorie } from "../../../services/interfaces/Categorie";

interface IGroupProps {
  categories: Categorie[];
}

export function Group(props: IGroupProps) {
  return <p>group</p>;
}
