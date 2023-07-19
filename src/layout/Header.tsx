import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/user/userSlice";
import { toast } from "react-toastify";

export default function Header() {
  const {user} = useAppSelector(state => state.user)
  const dispacth = useAppDispatch()
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispacth(setUser(null));
        toast.success('Logout Successfully')
      })
      .catch((error) => {
        toast.error("error")
      });
  };
  
  return (
  <div className=" h-14 bg-indigo-600 p-4 text-white flex justify-center items-center text-lg font-semibold shadow-lg">
      <NavLink to={'/'} className={'mr-2'} >
      <button className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Home</button>
      </NavLink>
      <NavLink to={'/all-books'} className={'mr-2'}>
      <button className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Books</button>
      </NavLink>
      <NavLink to={'/add-new-book'} className={'mr-2'}>
      <button className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Add New</button>
      </NavLink>
     {
      user.email ?  <NavLink to={'/register'} className={'mr-2'}>
      <button onClick={handleLogout} className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Logout</button>
      </NavLink> :  
      <>
      <NavLink to={'/login'} className={'mr-2'}>
      <button className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Sign In</button>
      </NavLink>
      <NavLink to={'/register'} className={'mr-2'}>
      <button className=" hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring p-1 pr-2  pl-2 rounded-md">Signup</button>
      </NavLink>
      </>
     }
     
     
    </div>
  )
}
