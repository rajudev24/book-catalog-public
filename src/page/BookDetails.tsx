import { useNavigate, useParams } from "react-router-dom";
import {  useBookReviewMutation, useDeleteBookMutation, useSingleBookQuery, useUpdateBookMutation } from "../redux/api/apiSlice";
import { ChangeEvent, FormEvent, useState,MouseEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
type review = {
  id: string;
  review: string;
};
interface FormData {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function BookDetails() {
  const [review, setReview] = useState<string>('');
const navigate = useNavigate()
 
  const { id } = useParams();
  const { data, isLoading } = useSingleBookQuery(id ?? "");
  const [postReview, { op}] = useBookReviewMutation()
  const [deleteBook, {options}] = useDeleteBookMutation()
  const [updateBook, {isError}]  = useUpdateBookMutation()
  const [isUpdate, setUpdate] = useState(false)

  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });


  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const options:review ={
      id: id??'',
      review: review
    }
    const res = postReview(options)
    setReview('')
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  const { id: bookId, title, author, genre, publicationDate } = data.data;

  const handleDelete = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    const res = deleteBook(id);
    toast.success('Book deleted successfully');
    setTimeout(() => {
      navigate('/all-books')
    }, 2000);
  };


      const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleUpdateSubmit =  (e: FormEvent) => {
        const options ={
          id: id??'',
          title: formData.title,
          author: formData.author,
          genre: formData.genre,
          publicationDate: formData.publicationDate
        }
        e.preventDefault();
          const response = updateBook(options)
          toast.success('Book updated successfully')
      };
  return (
    <>
    {
      isUpdate ? 
      <div className='flex justify-center items-center'>
      <form onSubmit={handleUpdateSubmit}>
         <div className=' text-2xl font-bold mb-2'>
            Update The Book Details
        </div>
        <label htmlFor="title">Title of the Book</label> <br />
        <input
        className=' border-2 p-2 mt-2 mb-2 w-96'
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          onChange={handleUpdate}
          required
          placeholder='Write a title of book'
        /> {""} <br />

        <label htmlFor="author">Author of the Book</label> <br />

        <input
         className=' border-2 p-2 mt-2 mb-2 w-96'
          type="text"
          id="author"
          name="author"
          defaultValue={author}
          onChange={handleUpdate}
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
          defaultValue={genre}
          onChange={handleUpdate}
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
          onChange={handleUpdate}
          required
        />
         {""} <br />

        <button className='mt-4 mb-4 bg-lime-600 p-2 pr-6 pl-6 text-white rounded-md font-semibold' type="submit">Submit</button>
      </form>
      <ToastContainer/>
      </div> 
    : 
      <div className="m-8 flex justify-center items-center">
      <div className="shadow-xl p-8 border-2 rounded-md">
      <h1 className="font-bold mt-2 mb-2">Book Details</h1>
      <p>Title: {title}</p>
      <p>Author: {author}</p>
      <p>Genre: {genre}</p>
      <p>Publication Date: {publicationDate.split('T')[0] }</p>
      <button onClick={()=> setUpdate(true)} className="bg-lime-600 p-2 rounded-md text-white font-medium mt-2"> Edit Book</button>
      <button onClick={(e) => handleDelete(e, bookId??'')} className=" bg-lime-600 p-2 rounded-md text-white font-medium mt-2 ml-8"> Delete Book </button>
      <div className="mt-4 ">
      <form onSubmit={handleSubmit} action="">
      <label  htmlFor=""> Write a review about the book</label> <br />
        <textarea  onChange={handleChange} value={review} className="w-52 border-4 p-2 h-20 mt-2" placeholder="write a review" ></textarea> <br />
        <button className=" bg-blue-600 p-2 rounded-md text-white font-medium mt-2" type="submit">Submit</button>
      </form>

      </div>
      </div>
      <ToastContainer/>
      </div>
    }
    
   
    </>
  );
}
