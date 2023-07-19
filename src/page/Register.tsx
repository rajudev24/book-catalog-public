/* eslint-disable @typescript-eslint/no-floating-promises */
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {  createUser } from "../redux/user/userSlice";
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";

interface SignupFromInpurs{
  email: string
  password: string
}

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<SignupFromInpurs>({
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
    dispatch(createUser({email: formData.email, password: formData.password }))
   
      toast.success('Account Created successfully')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
  
  };
  
  return (
    <div className='flex justify-center items-center'>
        
    <form onSubmit={handleSubmit}>
       <div className=' text-2xl font-bold mb-2'>
          Please Register
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
      <button className='mt-4 mb-4 bg-lime-600 p-2 pr-6 pl-6 text-white rounded-md font-semibold' type="submit">Register</button>
    </form>
    <ToastContainer/>
  </div>
  )
}
