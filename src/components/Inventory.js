import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [books, setBooks] = useState([]);
    const [stores, setStores] = useState([]);
    const { user } = useAuthContext();

    const [form, setForm] = useState({
        book_id: '',
        store_id: '',
        stock: ''
    });

    useEffect(() => {
        fetchInventory();
        fetchBooksAndStores();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`${API_URL}/inventory`);
            setInventory(response.data.inventories);
        } catch (error) {
            console.error("Error al obtener inventario:", error);
        }
    };

    const fetchBooksAndStores = async () => {
        try {
            const booksResponse = await axios.get(`${API_URL}/books`);
            const storesResponse = await axios.get(`${API_URL}/stores`);
            setBooks(booksResponse.data.books);
            setStores(storesResponse.data.stores);
        } catch (error) {
            console.error("Error al obtener libros o tiendas:", error);
        }
    };

    const handleDeleteInventory = async (id) => {
        try {
            await axios.delete(`${API_URL}/inventory/${id}`);
            fetchInventory();
        } catch (error) {
            console.error("Error al eliminar elemento del inventario:", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddElement = async () => {
        try {
            const newElement = {
                book_id: parseInt(form.book_id, 10),
                store_id: parseInt(form.store_id, 10),
                stock: parseInt(form.stock, 10)
            };
            await axios.post(`${API_URL}/inventory`, newElement);
            fetchInventory();
            alert("Elemento agregado correctamente.");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else {
                alert("Error al agregar el elemento.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', form);
        handleAddElement();
    };

    return (
        <div className='mt-10 flex flex-col items-center'>
            <h2 className='text-2xl text-center font-bold my-2'>Inventario</h2>

            {inventory.length === 0 ? (
                <p>No hay elementos en el inventario.</p>
            ) : (
                <ul className='w-[500px] flex flex-col gap-4'>
                    {inventory.map((element) => (
                        <li key={element.id} className='shadow-xl rounded-xl items-center p-2 ring ring-blue-400'>
                            <div className='flex flex-row justify-between items-center'>
                                <p className='text-[1.5rem]'>{element.store_name}</p>
                                <h3 className='text-2xl font-semibold cursor-pointer w-fit hover:underline'>{element.book_name}</h3>
                                <p>{element.stock} en stock</p>
                            </div>
                            {user.user.isAdmin ? <button
                                onClick={() => handleDeleteInventory(element.id)}
                                className='p-3 bg-red-500 w-auto rounded-xl text-white font-semibold cursor-pointer'>
                                X
                            </button> : (<></>)}
                        </li>
                    ))}
                </ul>
            )}

            {user.user.isAdmin ?
                <form onSubmit={handleSubmit} className="my-10 flex flex-col w-[750px] p-8 space-y-6 bg-white rounded-lg shadow-lg ring-1 ring-blue-300">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agregar Elemento</h2>

                    <div>
                        <label htmlFor="book_id" className="block text-gray-700 font-medium mb-2">Libro</label>
                        <select id="book_id" name="book_id" value={form.book_id} onChange={handleChange} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Selecciona un libro</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="store_id" className="block text-gray-700 font-medium mb-2">Tienda</label>
                        <select id="store_id" name="store_id" value={form.store_id} onChange={handleChange} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Selecciona una tienda</option>
                            {stores.map((store) => (
                                <option key={store.store_id} value={store.store_id}>
                                    {store.store_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">Stock</label>
                        <input id="stock" name="stock" value={form.stock} onChange={handleChange} placeholder="Cantidad en stock" required type="number"
                            min={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer">
                        Agregar Elemento
                    </button>
                </form>
                : (<></>)}
        </div>
    );
};

export default Inventory;
