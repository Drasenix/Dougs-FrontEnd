import { Categorie } from "../../../services/interfaces/Categorie";

interface IAlpheticalProps {
  categories: Categorie[];
}

export function Alphabetical(props: IAlpheticalProps) {
  return <p>alphabetical</p>;
}
