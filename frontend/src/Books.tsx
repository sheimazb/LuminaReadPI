    import axios from 'axios';
    import {useEffect, useState } from "react";

    function Books()
    {
        const [id, setId] = useState('');
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [matricule, setMatricule] = useState("");
        const [books, setBooks] = useState([]);

        useEffect(() => {
            (async () => await Load())();
        }, []);

        async function  Load()
        {
            const result = await axios.get(
                "http://127.0.0.1:8000/api/books");
            setBooks(result.data);
            console.log(result.data);
        }


        async function save(event)
        {
            event.preventDefault();
            try
            {
                await axios.post("http://127.0.0.1:8000/api/save",
                    {

                        name: name,
                        description: description,
                        matricule: matricule

                    });
                alert("book Registation Successfully");
                setId("");
                setName("");
                setDescription("");
                setMatricule("");
                Load();

            }
            catch(err)
            {
                alert("Student Registation Failed");
            }
        }
        async function editBook(books)
        {
            setName(books.name);
            setDescription(books.description);
            setMatricule(books.matricule);

            setId(books.id);

        }



        async function DeleteBook(id)
        {

            await axios.delete("http://localhost:8000/api/update/" + id);
            alert("book deleted Successfully");
            Load();

        }



        async function update(event)
        {
            event.preventDefault();

            try
            {

                await axios.put("http://localhost:8000/api/delete/"+ books.find(u => u.id === id).id || id,
                    {
                        id: id,
                        name: name,
                        description: description,
                        matricule: matricule

                    });
                alert("Registation Updateddddd");
                setId("");
                setName("");
                setDescription("");
                setMatricule("");
                Load();

            }
            catch(err)
            {
                alert("User Registation Failed");
            }
        }

        return (
            <div>
                <h1>Books Details</h1>
                <div class="container" >
                    <form>
                        <div class="form-group">
                            <input  type="text" class="form-control" id="student_id" hidden
                                    value={id}
                                    onChange={(event) =>
                                    {
                                        setId(event.target.value);
                                    }}

                            />
                            <label>book Name</label>
                            <input  type="text" class="form-control" id="studentName"
                                    value={name}
                                    onChange={(event) =>
                                    {
                                        setName(event.target.value);
                                    }}
                            />
                        </div>
                        <div class="form-group">
                            <label>book description</label>
                            <input  type="text" class="form-control" id="studentAddress"
                                    value={description}
                                    onChange={(event) =>
                                    {
                                        setDescription(event.target.value);
                                    }}
                            />
                        </div>

                        <div class="form-group">
                            <label>matricule</label>
                            <input type="text" class="form-control" id="studentPhone"
                                   value={matricule}
                                   onChange={(event) =>
                                   {
                                       setMatricule(event.target.value);
                                   }}
                            />
                        </div>

                        <div>
                            <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
                            <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
                        </div>
                    </form>
                </div>
                <div>
                    <br/>

                    <table class="table table-dark" align="center">
                        <thead>
                        <tr>
                            <th scope="col">Book Id</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Book description </th>
                            <th scope="col">Book matricule</th>

                            <th scope="col">Option</th>
                        </tr>
                        </thead>
                        {books.map(function fn(book)
                        {
                            return(
                                <tbody>
                                <tr>
                                    <th scope="row">{book.id} </th>
                                    <td>{book.name}</td>
                                    <td>{book.description}</td>
                                    <td>{book.matricule}</td>
                                    <td>
                                        <button type="button" class="btn btn-warning"  onClick={() => editBook(book)} >Edit</button>
                                        <button type="button" class="btn btn-danger" onClick={() => DeleteBook(book.id)}>Delete</button>
                                    </td>
                                </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        );
    }

    export default Books;
