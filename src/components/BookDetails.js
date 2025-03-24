import React from 'react';

const BookDetails = ({ book }) => {
    return (
        <div className='w-full flex justify-center my-10'>
            <div className={`p-5 grid grid-cols-5 gap-3 w-[500px]"} `}>
                <div className='col-span-4'>
                    <h2 className='text-xl font-semibold'>{book.name}</h2>
                    <p className='text-gray-500'>{book.genre}</p>
                </div>

                <div className='text-4xl'>
                    <p>{book.price}€</p>
                </div>
                <div className='flex flex-col'>
                    <p>Fecha de publicación: {book.published}</p>
                    <div className='flex gap-2'>{book.authors.map((author, i) => {
                        return <p key={i}>{author}</p>
                    }
                    )}</div>
                </div>
                <div className='text-[.8rem] col-span-5 text-gray-500'>
                    <p>Id: {book.id}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;