import React from 'react';

function Table({ books , deleteItem }) {


  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Book ID</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
  {books.map(({ book_id, name, price }) => (
    <tr key={book_id}>
      <td>{name}</td>
      <td>{book_id}</td>
      <td>{price}</td>
      <td><button onClick={() => deleteItem(book_id)}>X</button></td>
    </tr>
  ))}
</tbody>

    </table>
  );
}

export default Table;
