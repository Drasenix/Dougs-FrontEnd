export interface Categorie {
  id: number;
  group?: {
    id: number;
    name: string;
    color: string;
  };
  wording: string;
  description: string;
}
