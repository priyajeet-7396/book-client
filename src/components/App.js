import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Table from './Table';
import Form from './Form';
import Auth from './Auth';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null)
 
  const name = cookies.name
  const email = cookies.email
  const authToken = cookies.AuthToken

  console.log(name)
  console.log(email)




  // funciton to add more data 
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`https://demo-node-api-sigma.vercel.app/?email=${email}`, {
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
      const response = await fetch(`https://demo-node-api-sigma.vercel.app/?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  const signOut = ()=> {
    console.log("signout pressed")
    removeCookie('email');
    removeCookie('AuthToken');
    removeCookie('email')
    window.location.reload();
}



useEffect(() => {
  if (authToken) {
    fetchData();
  }
}, [authToken]);


  return (
    <div className="bg-gradient-to-b from-black to-gray-800 min-h-screen text-white">
     
          <>
          {!authToken && <Auth fetchData ={fetchData} />}
          {authToken && <>
           
            <h1 className="text-center text-blue-400 font-bold text-4xl sm:text-5xl pt-8">
              My Book List 📚
            </h1>
             <button 
        className="absolute top-0 right-0 text-white bg-red-800 px-2 py-1 rounded"
        onClick={signOut}
    >
        Sign Out
    </button>
            <p
             className="text-center text-blue-400 font-bold text-1xl sm:text-2xl pt-8"
            > welcome back {name}</p>
            {jsonData && jsonData.books && (
              <Table books={jsonData.books} deleteItem={deleteItem} />
            )}
            <Form onFormSubmit={handleFormSubmit} />
          </> }
           
          </>
 
    </div>
  );
}

export default App;
