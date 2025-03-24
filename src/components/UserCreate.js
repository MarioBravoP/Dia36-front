import React, { useState } from 'react';
import axios from 'axios';
import { useViewContext } from '../context/ViewContext';

const API_URL = process.env.REACT_APP_API_URL;

const UserCreate = () => {
    const { setView } = useViewContext();
    const [form, setForm] = useState({
        userName: '',
        realName: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const newElement = {
                userName: form.userName,
                realName: form.realName,
                password: form.password
            };
            await axios.post(`${API_URL}/users/register`, newElement);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else {
                alert("Error al crear usuario.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', form);
        handleCreate();
        setView('list');
    };

    return (
        <div className='w-full flex justify-center'>
            <form onSubmit={handleSubmit} className="my-10 flex flex-col w-[750px] p-8 space-y-6 bg-white rounded-lg shadow-lg ring-1 ring-blue-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registro</h2>

                <div>
                    <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">Nombre de usuario</label>
                    <input id="userName" name="userName" value={form.userName} onChange={handleChange} placeholder="Nombre de usuario" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="realName" className="block text-gray-700 font-medium mb-2">Nombre real</label>
                    <input id="realName" name="realName" value={form.realName} onChange={handleChange} placeholder="Nombre Real" maxLength={100} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input id="password" name="password" value={form.password} onChange={handleChange} required type="password"
                        min={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default UserCreate;
