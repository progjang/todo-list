import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryAtom, toDosAtom } from "../atoms";

export interface IForm {
  toDo: string;
}
function CreateToDo() {
  const category = useRecoilValue(categoryAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDosAtom);
  const onValid = (data: IForm) => {
    setToDos((oldToDos) => {
      const updatedToDos = [
        { id: Date.now(), text: data.toDo, category },
        ...oldToDos,
      ];
      localStorage.setItem("toDos", JSON.stringify(updatedToDos));
      return updatedToDos;
    });
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        style={{ padding: "10px", width: "400px", marginRight: "10px" }}
        {...register("toDo", {
          required: "You need to fill this field.",
          minLength: { value: 5, message: "need more than 5 characters" },
        })}
        placeholder="What to do?"
      />
      {errors?.toDo?.message}
      <button
        style={{
          padding: "10px",
          width: "100px",
          backgroundColor: "#81ecec",
          border: "none",
        }}
      >
        Add
      </button>
    </form>
  );
}

export default CreateToDo;
