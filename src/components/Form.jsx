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
          <h1 className="text-green-900 font-bold pb-3">Add Task </h1>
          <input
            type="text"
            name="name"
            placeholder="Write Task"
            value={data.name}
            onChange={handleChange}
            className="mb-2 p-2 border rounded bg-white text-lime-950 w-64 sm:w-full "
          />
          <input
            type="text"
            name="price"
            placeholder="Project"
            value={data.price}
            onChange={handleChange}
            className="mb-2 p-2 border rounded bg-white text-lime-950 w-64 sm:w-full"
          />
          <button
            type="submit"
            className={`bg-lime-900 text-white p-2 rounded w-64 sm:w-full`}
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
