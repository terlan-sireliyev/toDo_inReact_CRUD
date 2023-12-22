import { useState } from "react"
import style from './zTodo.module.css'


export default function TodoWrapper() {
    const [todoValue, setTodoValue] = useState('');
    const [todo, setTodo] = useState([]);
    const [count, setCount] = useState(1)
    const [edit, setEdit] = useState(0)
    const [error, setError] = useState('');

    const handleClick = (e) => {
        e.preventDefault()

        if (edit) {
            const editTodo = todo.find((ind) => ind.id === edit);
            const updateTodos = todo.map((saveTodo) =>
                saveTodo.id === editTodo.id
                    ? (saveTodo = { id: saveTodo.id, todoValue })
                    : { id: saveTodo.id, todoValue: saveTodo.todoValue }
            );
            setTodo(updateTodos);
            setEdit(0);
            setTodoValue('');
            return;
        }
        if (todoValue !== "" && todo !== "") {
            setTodo([{ id: `${todoValue}-${Date.now()}`, todoValue }, ...todo]);
            setCount(count)
        }

        if (!todoValue) {
            setTodo(todo);
            setError('Value cannot be null!')
        } else {
            setError('')
        }
        setTodoValue('')
    };

    const deleteTodo = (id) => {
        const delTodo = todo.filter((delFilter) => delFilter.id !== id)
        setTodo([...delTodo])
        setTodoValue('')
    }
    const handleClickColor = (id) => {
        setTodo(
            todo.map((item) => {
                if (item.id === id) {
                    return { ...item, done: !item.done }
                }
                return item
            })
        )
    }
    const handleClickEdit = (id) => {
        const editTodo = todo.find((i) => i.id === id)
        setTodoValue(editTodo.todoValue)
        setEdit(id)
    }
    return (
        <div className={style.todoDivBase}>
            <div>
                <form onSubmit={handleClick} className={style.formDiv}>
                    <input type="text" onChange={(e) => setTodoValue(e.target.value)} value={todoValue} placeholder="Please write to do" />
                    <button >{edit ? 'Edit' : "Add Todo"}</button>
                </form>
            </div>
            <div className={style.todoLists}>
                <ul>
                    {error && todoValue.length <= 0 ?
                        <p className={error && todoValue.length <= 0 ? style.errorP : ''} >
                            {error}
                        </p> : ''}
                    {
                        todo.map((list, id) => {
                            return (

                                <li key={id} className={style.liClass}>
                                    <div key={id}
                                        className={(list.done ? style.thLine : style.lineNoneP)}>
                                        ({id + count}) : {list.todoValue}
                                    </div>
                                    <div className={style.buttons}>
                                        <button onClick={() => deleteTodo(list.id)}>Delete</button>
                                        <button onClick={() => handleClickColor(list.id)} >Make</button>
                                        <button onClick={() => handleClickEdit(list.id)} >Edit</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}