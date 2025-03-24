import React, { useState } from 'react';

const BookCreate = ({ onSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        genre: '',
        price: '',
        published: undefined,
        publisher_id: undefined,
        authors_id: []
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        const authorId = Number(e.target.value);
        setForm((prevForm) => {
            const isSelected = prevForm.authors_id.includes(authorId);
            return {
                ...prevForm,
                authors_id: isSelected
                    ? prevForm.authors_id.filter(id => id !== authorId)
                    : [...prevForm.authors_id, authorId] 
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', form);
        onSubmit(form);
    };

    return (
        <div className='w-full flex justify-center'>
            <form onSubmit={handleSubmit} className="my-10 flex flex-col w-[750px] p-8 space-y-6 bg-white rounded-lg shadow-lg ring-1 ring-blue-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agregar Libro</h2>

                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Nombre del libro" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="genre" className="block text-gray-700 font-medium mb-2">Género</label>
                    <input id="genre" name="genre" value={form.genre} onChange={handleChange} placeholder="Género del libro" maxLength={100} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Precio</label>
                    <input id="price" name="price" value={form.price} onChange={handleChange} placeholder="Precio" required type="number" step="0.01"
                        min={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="published" className="block text-gray-700 font-medium mb-2">Año de publicación</label>
                    <input id="published" name="published" value={form.published} onChange={handleChange} placeholder="Año" required type="number" max={9999}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="publisher_id" className="block text-gray-700 font-medium mb-2">Editorial</label>
                    <select id="publisher_id" name="publisher_id" value={form.publisher_id} onChange={handleChange} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="1">Editorial 1</option>
                        <option value="2">Editorial 2</option>
                        <option value="3">Editorial 3</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Autor</label>
                    <div className="space-y-2">
                        {[
                            { id: 1, name: "Autor 1" },
                            { id: 2, name: "Autor 2" },
                            { id: 3, name: "Autor 3" }
                        ].map((author) => (
                            <label key={author.id} className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    name="authors_id" 
                                    value={author.id} 
                                    checked={form.authors_id.includes(author.id)} 
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span>{author.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
                >
                    Agregar Libro
                </button>
            </form>
        </div>
    );
};

export default BookCreate;
