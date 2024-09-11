// Import useState from react
import { useState } from "react";

function TodoList() {
    //declare states
    const [todo, setTodo] = useState({description:"",duedate:""});
    const [todos, setTodos] = useState([]);//array [], hold all todos user input
 
    const addTodo = () => {
        /* if (todo == ""){
          alert(`The description should not be empty`)
        } */

        if (!todo.description){
          alert(`The description should not be empty`)
        }
        else{
        setTodos([todo, ...todos])//depends the order
        //setTodos([...todos, desc]) is also ok, but the order is converse
        setTodo({description:"", duedate:""})//clean the desc after click Add
        }    
    }

    const deleteTodo =(index)=>{
      setTodos(todos.filter((todo, i) => i !== index))
    }
    return(
      <>
      <h3>My Todo List</h3>
      <p>Description: <input 
        placeholder="Type a todo item" 
        value={todo.description}
        onChange={event => setTodo({...todo, description: event.target.value})}
        />Due Date: <input 
        placeholder="Due date" 
        value={todo.duedate}
        onChange={event => setTodo({...todo, duedate: event.target.value})}

        //onChange={event => setDesc(event.target.value)}
        /></p>
      <button onClick={addTodo}>Add</button>
      <table>
          <tbody>
            <tr>
              <td className="title">Date</td>
              <td className="title">Description</td>
            </tr>
              {todos.map((item,index) => (
                <tr key={index}>
                <td>{item.duedate}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </td>
                </tr>
              ))}
              
          
          </tbody>
        </table>
    
      </>
    );
  }
  
  export default TodoList;