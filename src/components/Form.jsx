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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name of the book"
          value={data.name}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="price"
          placeholder="Price of the book"
          value={data.price}
          onChange={handleChange}
        ></input>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Form;
