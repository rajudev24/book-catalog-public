import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../redux/api/apiSlice"
import { ChangeEvent, useEffect, useState } from "react";
import { ResponseData, bookData } from "../interfaces";


export default function AllBooks() {
  const navigate= useNavigate()
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [Books, setBooks] = useState<bookData[] | null>(null)
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const {data, isLoading} = useGetBooksQuery(searchValue)
  useEffect(() => {

    if (data) {
      let filteredData = data.data;
      if (selectedGenre) {
        filteredData = filteredData.filter((book) => book.genre === selectedGenre);
      }
      if (selectedYear) {
        filteredData = filteredData.filter((book) => {
          const publicationYear = new Date(book.publicationDate).getFullYear().toString();
          return publicationYear === selectedYear;
        });
      }

      // Update the filteredBooks state with the filtered data
      setBooks(filteredData);
    }
  }, [data, selectedGenre, selectedYear]);

  return (
    <>
    {
      isLoading ? <div>
        <h4>Loading ....</h4> 
      </div> : <div className="m-8 flex justify-center items-center ">
      
      <div>
      <div className="flex">
     <div>
       <label htmlFor="">Search the book by Title, Author & Genre</label> <br />
       <input
         className="rounded-2 border-2 p-2 mt-2 mb-2 w-96"
         type="text"
         placeholder="Search the book by title, author & genre"
         value={searchValue}
         onChange={handleSearchChange}
       />
     </div>
     <div className="ml-8">
       <label htmlFor="genre">Filters by Genre:</label> {''}
       <select name="genre" id="genre" value={selectedGenre} onChange={handleGenreChange}>
         <option value="">All</option>
         <option value="Historical Fiction">Historical Fiction</option>
         <option value="Fantasy">Fantasy</option>
         <option value="Science">Science</option>
         <option value="History">History</option>
       </select>
     </div>
     <div className="ml-8">
       <label htmlFor="year">Filters by Publication Year:</label> {''}
       <select name="year" id="year" value={selectedYear} onChange={handleYearChange}>
         <option value="">All</option>
         <option value="2018">2018</option>
         <option value="2019">2019</option>
         <option value="2020">2020</option>
         <option value="2023">2023</option>
       </select>
     </div>
   </div>
      <h1 className="text-xl font-bold mb-4 ">Our Books</h1>
      <div className="grid grid-cols-3 gap-4">
      {
       Books && Books?.map((book, index)=>(
         <div key={index}  className="  mt-4 shadow-xl p-4 border-2 rounded-md" > 
        <h1>Title: {book?.title} </h1>
        <h1>Author: {book?.author} </h1>
        <h1>Genre:{book?.genre} </h1>
        <h1>Publiction Date: {book?.publicationDate.split("T")[0]} </h1>
        <button onClick={()=> navigate(`/all-books/${book?.id}`)} className="bg-lime-600 p-2 rounded-md text-white font-medium mt-2">View Details</button>
      </div>
       ))
      }
      </div>
      </div>
   </div>
    }
    </>
  )
}
