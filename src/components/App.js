import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function App() {
  const [jsonData, setJsonData] = useState(null);


  // funciton to add more data 
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('https://demo-node-api-sigma.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      const Data = await response.json();
      console.log('Form data submitted:', Data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
  

  // fucntion to get all data 
  const fetchData = async () => {
    try {
      const response = await fetch('https://demo-node-api-sigma.vercel.app/');
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//  function to delete item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://demo-node-api-sigma.vercel.app/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(`Item with ID ${id} deleted successfully`, data);
        fetchData(); // Assuming fetchData is a function that refetches the data after deletion
      } else {
        console.error(`Failed to delete item with ID ${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>My Book List</h1>
      {jsonData && jsonData.books && (
        <Table books={jsonData.books}
        deleteItem = {deleteItem}
         />
      )}
      <Form 
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
