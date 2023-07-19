/* eslint-disable @typescript-eslint/no-floating-promises */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useLocation, useNavigate } from "react-router-dom";

interface LoginFromInpurs{
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const previousState = useLocation().state?.path;
  const dispatch = useAppDispatch()
  const {user, isLoading} =  useAppSelector((state)=> state.user)
  const [formData, setFormData] = useState<LoginFromInpurs>({
    email: '',
    password: '',
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
    dispatch(loginUser({email: formData.email, password: formData.password }))
   
    toast.success('Logged in successfully')
  
  };

  useEffect(()=>{
    if(user.email && !isLoading){
      previousState ? navigate(previousState) : navigate('/');
    }
  }, [user.email, isLoading, previousState])
  
  return (
    <div className='flex justify-center items-center'>
        
    <form onSubmit={handleSubmit}>
       <div className=' text-2xl font-bold mb-2'>
          Please Login 
      </div>
      <label htmlFor="title">Your email</label> <br />
      <input
      className=' border-2 p-2 mt-2 mb-2 w-96'
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder='email'
      /> {""} <br />

      <label htmlFor="author">Your Password</label> <br />

      <input
       className=' border-2 p-2 mt-2 mb-2 w-96'
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder='password'
      />
       {""} <br />
      <button className='mt-4 mb-4 bg-lime-600 p-2 pr-6 pl-6 text-white rounded-md font-semibold' type="submit">Login</button>
    </form>
    <ToastContainer/>
  </div>
  )
}
