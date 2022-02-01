import { atom, selector } from "recoil";

export enum ECategories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export interface ICategory {
  id: number;
  text: string;
}

const getToDos = () => {
  const savedToDos = localStorage.getItem("toDos") || "[]";
  return JSON.parse(savedToDos);
};
const getCategories = () => {
  const savedCategories = localStorage.getItem("categories") || "[]";
  return JSON.parse(savedCategories);
};

export const toDosAtom = atom<IToDo[]>({
  key: "toDos",
  default: getToDos(),
});
export const categoriesAtom = atom<ICategory[]>({
  key: "categories",
  default: getCategories(),
});
export const categoryAtom = atom<ECategories>({
  key: "category",
  default: ECategories.TO_DO,
});
export const toDosSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    const category = get(categoryAtom);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
