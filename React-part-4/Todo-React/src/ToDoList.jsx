import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "Sample-Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTodo = () => {
        if (newTodo.trim() === "") return;  // Prevent adding empty tasks
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone : false }];
        });
        setNewTodo(""); // Clear input field after adding
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    let upperCaseAll = ()=>{
        setTodos((prevTodos)=>
            prevTodos.map((todo)=>{
            return {
                ...todo,
                task : todo.task.toUpperCase(),
            };
        })
    );
    }

    let markAsDone = (id)=>{
        setTodos((prevTodos)=>
            prevTodos.map((todo)=>{
            if(todo.id == id){
                return {
                    ...todo,
                    isDone : true,
                };
            }
            else{
                return todo;
            }
            
        })
    );  
    };

    let lowerCaseAll = () => {
        setTodos(todos.map((todo)=>{
            return {
                ...todo,
                task: todo.task.toLowerCase(),
            };
        })
        );
    }
    return (
        <div>
            <h4>TODO APP</h4>
            <input 
                type="text" 
                placeholder="Add Task" 
                value={newTodo}  
                onChange={updateTodoValue} 
            /> 
            <button onClick={addNewTodo}>Add</button>
            <br /><br />
            <hr />
            <h6>List of Tasks</h6>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}> 
                        <span style={todo.isDone ?  {textDecoration: 'line-through'} : {}}>{todo.task}</span> 

                        &nbsp;
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => markAsDone(todo.id)}>Done</button>
                    </li>
                ))}
            </ul>
            <button onClick={upperCaseAll}>UpperCase All</button>
            <button onClick={lowerCaseAll}>LowerCase All</button>
            

        </div>
    );
}
