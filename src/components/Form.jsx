import { useState } from "react"
import Todo from "./Todo"

const Form = () => {

    const [todos, setTodos] = useState([
        {todo: 'todo 1'},
        {todo: 'todo 2'},
        {todo: 'todo 3'}
    ])

    return(
        <>
        {todos.map((value, index)=>(
            <Todo todo={value.todo}/>
        ))}
        </>
    )
}

export default Form