import { useGetBooksQuery } from "../redux/api/apiSlice";


export default function Home() {
 
  const {data, isLoading} = useGetBooksQuery('')
  console.log(data?.data);
  console.log(isLoading);
  return (
    <div className="m-8 flex justify-center items-center ">
    <div>
    <h1 className="text-xl font-bold mb-4 ">Recently added books</h1>
    <div className="grid grid-cols-3 gap-4">
    {
  data?.data &&
    data?.data
      .slice()
      .reverse() 
      .slice(0, 10) 
      .map((book, index) => (
        <div key={index} className="mt-4 shadow-xl p-4 border-2 rounded-md">
          <h1>Title: {book?.title}</h1>
          <h1>Author: {book?.author}</h1>
          <h1>Genre: {book?.genre}</h1>
          <h1>Publication Date: {book?.publicationDate.split("T")[0]}</h1>
        </div>
      ))
}
    </div>
    </div>
 </div>
  )
}
