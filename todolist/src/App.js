//Essentials 
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

//Styling
import "./App.scss";
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { RiChatDeleteLine, RiChatCheckLine, RiAddLine } from "react-icons/ri";


const App = () => {

    //Stores
    const [textField, setTextField] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    //If previous persisted data is there, get that!
    useEffect(() => {
        let todo = JSON.parse(sessionStorage.getItem("todoList"));
        let done = JSON.parse(sessionStorage.getItem("doneList"));
        if (todo) setTodoList(todo);
        if (done) setDoneList(done);
    }, []);

    //On submit of the text
    const todoSubmit = (e) => {
        e.preventDefault();
        if (textField !== "")
            setTodoList((list) => [
                ...list,
                { uid: uuidv4(), list: textField },
            ]);
        setTextField("");
    };

    //delete a todo from either of the lists
    const deleteTodo = (uid) => {
        setTodoList((list) => list.filter((li) => li.uid !== uid));
        setDoneList((list) => list.filter((li) => li.uid !== uid));
    };
    //move from todo to done tab
    const doneTodo = (uid, text) => {
        deleteTodo(uid);
        setDoneList((list) => [...list, { uid: uid, list: text }]);
    };
    //update the session storage to persist the data
    useEffect(() => {
        sessionStorage.setItem("todoList", JSON.stringify(todoList));
        sessionStorage.setItem("doneList", JSON.stringify(doneList));
    }, [todoList, doneList]);

    return (
        <div className="todo-container">
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
            <div className="list">
                <div className="list__todo">
                    <AnimatePresence>
                        {todoList &&
                            todoList.map((list) => (
                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="list__todo__li"
                                    key={list.uid}
                                >
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
                                </motion.li>
                            ))}
                    </AnimatePresence>
                </div>
                <div className="list__done">
                    <AnimatePresence>
                        {doneList &&
                            doneList.map((list) => (
                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
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
                                </motion.li>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default App;
