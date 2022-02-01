import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoriesAtom, categoryAtom, ECategories, toDosSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [categories, setCategories] = useRecoilState(categoriesAtom);
  console.log(toDos);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    console.log(value, typeof value);
    setCategory(value as any);
  };
  return (
    <div style={{ margin: "20px" }}>
      <div style={{display:"flex"}} >
      <Link to="/category"><button style={{marginBottom: "10px", padding: "10px", color:"white"}}>✖️</button></Link>
      <select
        style={{ width:"120px", fontSize:"15px", padding: "10px", margin: "0px 10px 20px 0px" }}
        value={category}
        onInput={onInput}
      >
        <option value={ECategories.TO_DO + ""}>To do</option>
        <option value={ECategories.DOING + ""}>Doing</option>
        <option value={ECategories.DONE + ""}>Done</option>
        {categories.map((cat) => <option value={cat.text}>{cat.text}</option>)}
      </select>
      </div>
      <div>
      <CreateToDo />
      </div>
      <div>
      <h1 style={{ fontSize: "24px", padding: "10px" }}>{category} List</h1>

      <hr />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      </div>
    </div>
  );
  /*   const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setError("too short, need more than 10");
    }
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Enter ToDo" />
        <button>Send</button>
        {error !== "" ? error : null}
      </form>
    </div>
  ); */
}

export default ToDoList;
