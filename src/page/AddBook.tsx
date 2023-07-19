import { useState, ChangeEvent, FormEvent } from 'react';
import { useAddBookMutation } from '../redux/api/apiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }

export default function AddBook() {
const [postBook, {isError, isLoading}]  = useAddBookMutation()
console.log(isError, isLoading);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        genre: '',
        publicationDate: '',
      });
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit =  (e: FormEvent) => {
        e.preventDefault();
          const response = postBook(formData)
          toast.success('Book added successfully')
          setFormData({
            title: '',
            author: '',
            genre: '',
            publicationDate: '',
          });
      };
  return (
    <div className='flex justify-center items-center'>
        
      <form onSubmit={handleSubmit}>
         <div className=' text-2xl font-bold mb-2'>
            Add A New Book
        </div>
        <label htmlFor="title">Title of the Book</label> <br />
        <input
        className=' border-2 p-2 mt-2 mb-2 w-96'
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder='Write a title of book'
        /> {""} <br />

        <label htmlFor="author">Author of the Book</label> <br />

        <input
         className=' border-2 p-2 mt-2 mb-2 w-96'
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder='Write a Author of book'
        />
         {""} <br />

        <label htmlFor="genre">Genre of the Book</label> <br />
        <input
         className=' border-2 p-2 mt-2 mb-2 w-96'
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          placeholder='Write a Genre of book'
        />
         {""} <br />

        <label htmlFor="publicationDate">Publication Date of the Book</label> <br />
        <input
         className=' border-2 p-2 mt-2 mb-2 w-96'
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          required
        />
         {""} <br />

        <button className='mt-4 mb-4 bg-lime-600 p-2 pr-6 pl-6 text-white rounded-md font-semibold' type="submit">Submit</button>
      </form>
      <ToastContainer/>
    </div>
  );
  
}
