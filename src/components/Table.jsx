import React from 'react';

function Table({ books, deleteItem }) {
  return (
    <table className="mx-auto my-4 bg-lime-100 text-emerald-800 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-emerald-800 text-gray-200">
        <tr>
          <th className="py-2 px-4">Task ID</th>
          <th className="py-2 px-4">Task</th>
          <th className="py-2 px-4">Project</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(({ book_id, name, price }) => (
          <tr key={book_id} className="hover:bg-lime-200">
            <td className="py-2 px-4">{book_id}</td>
            <td className="py-2 px-4">{name}</td>
            <td className="py-2 px-4">{price}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => deleteItem(book_id)}
                className="text-white bg-red-700 px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
