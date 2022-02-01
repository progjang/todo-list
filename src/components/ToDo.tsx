import { categoriesAtom, ECategories, IToDo, toDosAtom } from "../atoms";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Text = styled.span`
  font-size: 28px;
  margin-right: 10px;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 10px;
`;
const saveToDos = (toDos: IToDo[]) => {
  localStorage.setItem("toDos", JSON.stringify(toDos));
};

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDosAtom);
  const categories = useRecoilValue(categoriesAtom);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { id, text, category: newCategory };
      const updatedToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      saveToDos(updatedToDos);
      return updatedToDos;
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const updatedToDos = oldToDos.filter((toDo) => toDo.id !== id);
      saveToDos(updatedToDos);
      return updatedToDos;
    });
  };
  return (
    <Item>
      <Text>{text}</Text>
      {category !== ECategories.TO_DO ? (
        <Button onClick={() => onClick(ECategories.TO_DO)}>To Do</Button>
      ) : null}
      {category !== ECategories.DOING ? (
        <Button onClick={() => onClick(ECategories.DOING)}>DOING</Button>
      ) : null}
      {category !== ECategories.DONE ? (
        <Button onClick={() => onClick(ECategories.DONE)}>DONE</Button>
      ) : null}
      {categories.map((cat) => category !== cat.text ? (<Button onClick={() => onClick(cat.text)}>{cat.text}</Button>) : null)}
      <Button onClick={onDelete} style={{color:"red"}}>🔥Delete</Button>
    </Item>
  );
}

export default ToDo;
