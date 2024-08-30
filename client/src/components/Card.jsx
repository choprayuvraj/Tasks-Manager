import React, { useContext } from 'react'
import "./Card.css"
import AuthContext from '../store/auth-context';

function Card({ id, title, isChecked }) {

    const { token } = useContext(AuthContext);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/content/delete", {
                method: "DELETE",
                headers: {
                    id,
                    "Authorization": `Bearer ${token}`
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="form-div" onSubmit={handleSubmit}>
            <div className="front">
                <input className='checkbox' type="checkbox" checked={isChecked} />
                <p>{title}</p>
            </div>
            <div className="back">
                <button className='delete-btn'
                >Delete</button>
            </div>
        </form>
    )
}

export default Card
