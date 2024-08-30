import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../store/auth-context"
import "./Home.css"
import Card from '../components/Card'

function Home() {

    const { token } = useContext(AuthContext);

    const [todos, setTodos] = useState([]);

    const [data, setData] = useState({
        content: ""
    });

    const handleInput = (e) => {
        setData({
            content: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/content/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const resData = await response.json();
                setData({
                    content: ""
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/content/data", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const { responseContent } = await response.json();
                    setTodos(Object.values(responseContent));
                } else {
                    console.error('Failed to fetch todos');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchTodos();
    }, [token, todos]);


    return (
        <>
            <div className="container">
                <form className='edit-form' onSubmit={handleSubmit}>
                    <input type="text"
                        value={data.content}
                        onChange={handleInput}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>

            {
                !!token ? 
                    <div className="cards">
                        {todos.map((todo) => <Card title={todo.content} isChecked={todo.isDone} key={todo._id.toString()} id={todo._id.toString()} />)}
                    </div>
                    :
                    <h1>Login to continue</h1>
            }
        </>
    )
}

export default Home
