import React, { useState, useEffect } from 'react';

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://demo-node-api-sigma.vercel.app/');
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>books library</h1>
      {jsonData && jsonData.books && (
        <div>
          {jsonData.books.map((book) => (
            <div key={book.book_id}>
              <h1>{book.name}</h1>
              <p>Book ID: {book.book_id}</p>
              <p>Price: {book.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
