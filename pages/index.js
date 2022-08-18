import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, settodoInput] = useState("");
  const [todos, settodos] = useState([]); //ประกาศเป็น array มาเก็บตัวแปร

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    settodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].complete = !todos[idx].complete; //todos is array
    settodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return; //no list todo
    const title = todos[idx].title; //keep title of button idx
    const complete = todos[idx].complete;

    todos[idx].title = todos[idx - 1].title;
    todos[idx].complete = todos[idx - 1].complete;

    todos[idx - 1].title = title;
    todos[idx - 1].complete = complete;
    settodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return; //no list todo
    const title = todos[idx].title; //keep title of button idx
    const complete = todos[idx].complete;

    todos[idx].title = todos[idx + 1].title;
    todos[idx].complete = todos[idx + 1].complete;

    todos[idx + 1].title = title;
    todos[idx + 1].complete = complete;
    settodos([...todos]);
  };

  const Onkeyuphandler = (event) => {
    if (event.key !== "Enter") return;
    if (todoInput === "") {
      alert("Todo cannot be empty");
    } else {
      const newTodos = [{ title: todoInput, complete: false }, ...todos]; //ทำarrayมาเปลี่ยนค่าใหม่ทุกครั้ง
      settodos(newTodos);
      settodoInput("");
    }
  };

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    } else {
      saveTodos();
    }
  }, [todos]);

  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (todoStr === null)
      settodos([]); // not found // undefined,null,0," " == same ;
    else settodos(JSON.parse(todoStr)); // found
  }, []);

  const saveTodos = () => {
    const todoStr = JSON.stringify(todos); //obj->String
    localStorage.setItem("react-todos", todoStr);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(event) => {
            settodoInput(event.target.value);
          }}
          value={todoInput}
          onKeyUp={Onkeyuphandler}
        />
        {/* {todoInput} */}

        <ul>
          {todos.map((todo, idx) => (
            <Todo
              title={todo.title}
              complete={todo.complete}
              key={idx}
              markBtn={() => markTodo(idx)}
              deleteBtn={() => deleteTodo(idx)}
              moveupBtn={() => moveUp(idx)}
              movedownBtn={() => moveDown(idx)}
            />
          ))}
        </ul>

        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((todo) => todo.complete === false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((todo) => todo.complete === true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Natacha Rungbanpant 640610629
        </p>
      </div>
    </div>
  );
}
