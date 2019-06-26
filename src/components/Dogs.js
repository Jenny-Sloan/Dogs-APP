import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Dogs() {
    const [dogs, setDogs] = useState([]);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [email, setEmail] = useState("");
    const [idState, setId] = useState("");

    const fetchDogs = () => fetch("http://localhost:4000")
        .then(response => response.json())
        .then(dogs => setDogs(dogs))

    useEffect(() => {
        fetchDogs()
    }, [])

    const handleForm = (dog) => {
        console.log('handleForm')
        setName(dog.name)
        setBreed(dog.breed)
        setEmail(dog.email)
        setId(dog._id)
    }

    const handleEdit = async (e, idState) => {
        e.preventDefault()
        console.log('handleEdit')
        const update = JSON.stringify({ name, breed, email })
        console.log('Update:', update)
        console.log('ID:', idState)
        await fetch("http://localhost:4000/" + idState, {
            method: "PUT",
            body: update,
            headers: {
                'Content-Type': 'application-/json'
            }
        })
     
        fetchDogs()
        document.querySelector('.close').click();
    }
    const handleDelete = async (id) => {
        await fetch("http://localhost:4000/" + id, {
            method: "DELETE"
        })
        fetchDogs()
    }
    console.log(dogs, name, breed)

    return (
        <div className="App">
            <h1> Hi from Dogs! </h1>
            <Link to="/form">Form</Link>
            <br />
            <Link to="/">Home</Link>
            <br />
            {dogs.map((dog) => (
                <div className="border" key={dog._id}>
                    <h2> {dog.name} </h2>
                    <h4> {dog.breed}</h4>
                    <p> {dog.email}</p>
                    <p> {dog._id}</p>

                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick={e => handleForm(dog)}>
                        Edit
</button>{" "}

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={e => handleEdit(e, idState)}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Breed</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Breed"
                                            value={breed}
                                            onChange={e => setBreed(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit"  className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {" "}
                    <button type="button" className="btn btn-danger" onClick={e => handleDelete(dog._id)}>Delete</button>
                </div>
            ))}

        </div>
    );
}


export default Dogs;