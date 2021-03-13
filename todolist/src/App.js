import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { RiChatDeleteLine, RiChatCheckLine, RiAddLine } from "react-icons/ri";
const App = () => {
    const [textField, setTextField] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    useEffect(() => {
        let todo = JSON.parse(sessionStorage.getItem("todoList"));
        let done = JSON.parse(sessionStorage.getItem("doneList"));
        if (todo.length > 0) setTodoList(todo);
        if (done.length > 0) setDoneList(done);
    }, []);

    
    const todoSubmit = (e) => {
        e.preventDefault();
        if (textField !== "")
            setTodoList((list) => [
                ...list,
                { uid: uuidv4(), list: textField },
            ]);
        setTextField("");
    };
    const deleteTodo = (uid) => {
        setTodoList((list) => list.filter((li) => li.uid !== uid));
        setDoneList((list) => list.filter((li) => li.uid !== uid));
    };
    const doneTodo = (uid, text) => {
        deleteTodo(uid);
        setDoneList((list) => [...list, { uid: uid, list: text }]);
    };
    useEffect(() => {
        sessionStorage.setItem("todoList", JSON.stringify(todoList));
        sessionStorage.setItem("doneList", JSON.stringify(doneList));
    }, [todoList, doneList]);
    return (
        <div className="todo-container">
            <div className="list">
                <div className="list__todo">
                    {todoList &&
                        todoList.map((list) => (
                            <li className="list__todo__li" key={list.uid}>
                                {list.list}
                                <div>
                                    <RiChatDeleteLine
                                        onClick={() => deleteTodo(list.uid)}
                                        className="list__todo__li__button"
                                        style={{ color: "red" }}
                                    />
                                    <RiChatCheckLine
                                        onClick={() =>
                                            doneTodo(list.uid, list.list)
                                        }
                                        className="list__todo__li__button"
                                        style={{ color: "blue" }}
                                    />
                                </div>
                            </li>
                        ))}
                </div>
                <div className="list__done">
                    {doneList &&
                        doneList.map((list) => (
                            <li
                                className="list__todo__li dashed"
                                style={{ textDecoration: "line-through" }}
                                key={list.uid}
                            >
                                {list.list}
                                <div>
                                    <RiChatDeleteLine
                                        onClick={() => deleteTodo(list.uid)}
                                        className="list__todo__li__button"
                                        style={{ color: "red" }}
                                    />
                                </div>
                            </li>
                        ))}
                </div>
            </div>
            <div className="input-area">
                <h1 className="input-area__heading">Enter your to-dos</h1>
                <form onSubmit={todoSubmit} className="input-area__form">
                    <input
                        id="todo-text"
                        type="text"
                        className="input-area__form__text"
                        value={textField}
                        onChange={(e) => {
                            setTextField(e.target.value);
                        }}
                    />
                    <RiAddLine
                        onClick={todoSubmit}
                        className="input-area__form__submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default App;
