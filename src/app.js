import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksList from './components/BooksList';
import BookCreate from './components/BookCreate';
import BookUpdate from './components/BookUpdate';
import Header from './components/Header';
import { useViewContext } from './context/ViewContext';
import BookDetails from './components/BookDetails';
import Inventory from './components/Inventory';
import LoginPage from './components/Login';
import { useAuthContext } from './context/AuthContext';
import UsersPage from './components/UsersPage';
import UserCreate from './components/UserCreate';

const API_URL = process.env.REACT_APP_API_URL;


function App() {
    const { view, setView } = useViewContext();
    const [books, setBooks] = useState([]);
    const [activeBook, setActiveBook] = useState(null);
    const { user } = useAuthContext()

    if (localStorage.getItem("user") !== null) {
        let token = JSON.parse(localStorage.getItem("user")).token;
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            setBooks(response.data.books);
        } catch (error) {
            console.error("Error al obtener libros:", error);
        }
    };

    const handleAddBook = async (book) => {
        try {
            await axios.post(`${API_URL}/books`, book);
            setView("list");
            fetchBooks();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else {
                alert("Error al agregar el libro.");
            }
        }
    };

    const handleUpdateBook = async (book) => {
        console.log("Libro a actualizar:", book);
        try {
            await axios.put(`${API_URL}/books/${book.id}`, book);
            setActiveBook(null);
            setView("list");
            fetchBooks();
        } catch (error) {
            console.error("Error al actualizar libro:", error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error al eliminar libro:", error);
        }
    };

    return (
        <div>
            <Header />
            {view === "list" && user && (
                <>
                    <BooksList
                        books={books}
                        onEdit={(book) => { setActiveBook(book); setView("updateBook"); }}
                        onDelete={handleDeleteBook}
                        onDetail={(book) => { setActiveBook(book); setView("detailBook") }}
                    />
                </>
            )}
            {view === "createBook" && <BookCreate onSubmit={handleAddBook} />}
            {view === "updateBook" && activeBook && <BookUpdate book={activeBook} onSubmit={handleUpdateBook} />}
            {view === "detailBook" && activeBook && <BookDetails book={activeBook} />}
            {view === "inventory" && <Inventory />}
            {view === "login" && <LoginPage />}
            {view === "userList" && <UsersPage />}
            {view === "userCreate" && <UserCreate />}
            
        </div>
    );
}

export default App;
