export interface ICategory {
  id: number;
  group?: IGroup;
  wording: string;
  description: string;
}

export interface IGroup {
  id: number;
  name: string;
  color: string;
}
