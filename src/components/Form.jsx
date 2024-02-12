import { useState } from "react";

const Form = ({ onFormSubmit }) => {
  const [data, setData] = useState({ name: "", price: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFormSubmit(data);
    setData({ name: "", price: "" });

  }


  

  return (
    <>
    <form onSubmit={handleSubmit} className="mx-auto my-4 max-w-md pt-9">
      <div className="flex flex-col items-center">
      <h1 className="text-blue-400 font-bold pb-3">Add more</h1>
        <input
          type="text"
          name="name"
          placeholder="Name of the book"
          value={data.name}
          onChange={handleChange}
          className="mb-2 p-2 border rounded bg-slate-900 text-white w-64 sm:w-full "
        />
        <input
          type="text"
          name="price"
          placeholder="Price of the book"
          value={data.price}
          onChange={handleChange}
          className="mb-2 p-2 border rounded bg-slate-900 text-white w-64 sm:w-full"
        />
        <button type="submit" className="bg-blue-900 text-white p-2 rounded w-64 sm:w-full">
          Submit
        </button>
      </div>
    </form>
  </>
  
  
  );
};

export default Form;
