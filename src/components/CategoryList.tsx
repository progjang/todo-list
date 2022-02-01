import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoriesAtom, ICategory } from "../atoms";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ICategoryForm {
    category: string;
}
const Button = styled.button`
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
`;
function CategoryList() {
    const [currentCategories, setCategories] = useRecoilState(categoriesAtom);
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<ICategoryForm>();
    const onValid = (data:ICategoryForm) => {
        setCategories((oldCategories) => {
            const updatedCategories = [
                {id: Date.now(), text: data.category},
                ...oldCategories
            ];
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            return updatedCategories;
        });
        setValue("category", "");
    }
    const onDelete = (id:ICategory["id"]) => {
        setCategories((oldCategories) => {
          const updatedCategories = oldCategories.filter((category) => category.id !== id);
          localStorage.setItem("categories", JSON.stringify(updatedCategories));
          return updatedCategories;
        });
      };
    return (
        <div style={{ margin: "20px" }}>
        <Link to="/"><button style={{marginBottom: "10px", padding: "10px", backgroundColor:"#e57"}}>Back</button></Link>
 
 <div>
 <form onSubmit={handleSubmit(onValid)}>
     <input style={{padding:"8px"}} {...register("category", {
         required:"type category plz.",
         minLength: { value: 2, message: "need more than 2 characters" },
         })} placeholder="category name" ></input>
     <button style={{
         padding: "10px",
         margin: "10px",
         backgroundColor: "#81ecec",
         border: "none"}}>
             Add Category
     </button>
     {errors?.category?.message}
 </form>
 <hr />
 <ul>
    {currentCategories.map(category => (<li>{category.text}<Button style={{color:"red"}} onClick={()=>onDelete(category.id)}>🔥Delete</Button></li>))}
 </ul>
 </div>
        </div>

    );
}

export default CategoryList;