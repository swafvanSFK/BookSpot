import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import summaryApi from "./api";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

export default function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const [addBook, setAddBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
  });

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(summaryApi.getAllBooks.url);
      setAllBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!addBook.title) {
      formIsValid = false;
      newErrors.title = "Title is required";
    }
    if (!addBook.author) {
      formIsValid = false;
      newErrors.author = "Author is required";
    }
    if (!addBook.description) {
      formIsValid = false;
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(summaryApi.addBook.url, addBook);
        if(response.data.success) {
          alert("Book added successfully");
          fetchAllBooks();
          setAddBook({ title: "", author: "", description: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `${summaryApi.deleteBook.url}/${bookId}`
      );
      if (response.data.success) {
        alert("Book deleted Successfully");
      }
      console.log("Book deleted successfully:", response.data);
      fetchAllBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setAddBook({ title: "", author: "", description: "" });
    setErrors({ title: "", author: "", description: "" });
  }

  return (
    <div>
      <Header />
      <div className=" bg-slate-200">
        <div className="px-10 pt-5">
          {/* Add Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowDialog((prev) => !prev)}
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-[#000000cd]"
            >
              Add Book
            </button>
          </div>

          {/* Display all books */}
          <div className="flex flex-row flex-wrap gap-3 py-5 justify-center">
            {allBooks.map((book, index) => (
              <div
                key={index}
                className="flex flex-row justify-center gap-2 max-w-[250px] min-w-[250px] bg-slate-900 text-white p-3 rounded-md"
              >
                <ul className="flex flex-col gap-2">
                  <li className="text-2xl font-semibold">{book.title}</li>{" "}
                  <li className="text-red-300">Written By: {book.author}</li>{" "}
                  <li className="text-[#bac4c7]">
                    {book.description ||
                      "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
                  </li>
                </ul>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDelete(book._id)}
                    className="bg-white cursor-pointer text-black text-2xl rounded-full p-1 hover:bg-red-500 hover:text-white transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Book Form */}
          {showDialog && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-400 flex flex-col py-4 justify-center items-center transition-all duration-300 ease-in-out opacity-100 ${
                !showDialog && "opacity-0 translate-y-10"
              }`}
            >
              <IoMdClose
                onClick={handleCloseDialog}
                className="absolute top-5 right-5 bg-white cursor-pointer text-black text-2xl rounded-full p-1 hover:bg-red-500 hover:text-white transition-all"
              />
              <h1 className="text-4xl my-4 font-bold">Add Book</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex gap-1 flex-col">
                  <input
                    value={addBook.title}
                    onChange={handleOnChange}
                    className="p-2 outline-none w-[400px]"
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
                <div className="flex flex-col  gap-1">
                  <input
                    value={addBook.author}
                    onChange={handleOnChange}
                    name="author"
                    className="p-2 outline-none w-[400px]"
                    type="text"
                    placeholder="Author"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm">{errors.author}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    name="description"
                    value={addBook.description}
                    onChange={handleOnChange}
                    className="p-2 outline-none w-[400px]"
                    type="text"
                    placeholder="Description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
                <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-[#000000cd]">
                  ADD
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
