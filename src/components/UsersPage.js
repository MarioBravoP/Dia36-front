import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const UsersList = ( ) => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();;
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }

    const handleEditUser = async (activeUser) => {
        try {
            const updatedUser = {
                ...activeUser,
                isAdmin: !activeUser.isAdmin
            };
            await axios.put(`${API_URL}/users/${activeUser.id}`, updatedUser);
            fetchUsers();
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    }

    return (
        <div className='mt-10 flex flex-col items-center'>
            <h2 className='text-2xl text-center font-bold my-2'>Lista de Usuarios</h2>
            {users.length === 0 ? (
                <p>No hay usuarios disponibles.</p>
            ) : (
                <ul className='w-[500px] flex flex-col gap-4'>
                    {users.map((usuario) => (
                        <li key={usuario.id} className='shadow-xl rounded-xl items-center p-2 ring ring-blue-400'>
                            <div className='flex flex-row justify-between items-center'>
                                <h3 className='text-2xl font-semibold cursor-pointer w-fit hover:underline'>{usuario.userName}</h3>
                                <p className='text-[2rem]'>{usuario.realName}</p>
                            </div>
                            <div className='flex flex-row justify-center gap-10 w-full'>
                                {user.user.isAdmin ? (
                                    <>
                                        <button onClick={() => handleEditUser(usuario)} className={`p-3 font-semibold w-auto rounded-xl text-white ${user.user.userName === usuario.userName ? 'bg-gray-500' : 'cursor-pointer bg-green-500'}`} disabled={user.user.userName === usuario.userName}>
                                            {usuario.isAdmin ? 'Admin' : 'Usuario'}
                                        </button>
                                        <button onClick={() => handleDeleteUser(usuario.id)} className={`p-3 w-auto rounded-xl text-white font-semibold  ${user.user.userName === usuario.userName ? 'bg-gray-500' : 'cursor-pointer bg-red-500'}`} disabled={user.user.userName === usuario.userName}>
                                            X
                                        </button>
                                    </>
                                ) : (<></>)}

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;