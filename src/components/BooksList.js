import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const BooksList = ({ books, onEdit, onDelete, onDetail }) => {
    const { user } = useAuthContext();

    return (
        <div className='mt-10 flex flex-col items-center'>
            <h2 className='text-2xl text-center font-bold my-2'>Lista de Libros</h2>
            {books.length === 0 ? (
                <p>No hay libros en la base de datos.</p>
            ) : (
                <ul className='w-[500px] flex flex-col gap-4'>
                    {books.map((book) => (
                        <li key={book.id} className='shadow-xl rounded-xl items-center p-2 ring ring-blue-400'>
                            <div className='flex flex-row justify-between items-center'>
                                <h3 onClick={() => onDetail(book)} className='text-2xl font-semibold cursor-pointer w-fit hover:underline'>{book.name}</h3>
                                <p className='text-[2rem]'>{book.price}€</p>
                            </div>
                            <div className='flex flex-row justify-center gap-10 w-full'>
                                {user.user.isAdmin ? (<>
                                    <button onClick={() => onEdit(book)} className='p-3 bg-green-500 font-semibold w-auto rounded-xl text-white cursor-pointer'>
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(book.id)} className='p-3 bg-red-500 w-auto rounded-xl text-white font-semibold cursor-pointer'>
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

export default BooksList;