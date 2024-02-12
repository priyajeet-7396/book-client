import { useState } from "react";

const Form = ({ onFormSubmit }) => {
  const [data, setData] = useState({ name: "", price: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Disable the submit button during the submission
    setIsSubmitting(true);

    // Perform the form submission
    await onFormSubmit(data);

    // Clear the form data and enable the submit button
    setData({ name: "", price: "" });
    setIsSubmitting(false);
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
          <button
            type="submit"
            className={`bg-${isSubmitting ? 'bg-cyan-600' : 'blue-900'} text-${isSubmitting ? 'blue-900' : 'white'} p-2 rounded w-64 sm:w-full`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
