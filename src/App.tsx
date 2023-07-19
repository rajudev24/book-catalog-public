
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'
import MainLayout from './layout/MainLayout'
import { useAppDispatch } from './redux/hook'
import { auth } from './lib/firebase'
import { setLoading, setUser } from './redux/user/userSlice'
import { useEffect } from 'react'


function App() {
const dispacth = useAppDispatch()
useEffect(()=>{
  dispacth(setLoading(true))
  onAuthStateChanged(auth, (user)=>{
    if(user){
      dispacth(setUser(user.email!))
      dispacth(setLoading(false))
    }else{
      dispacth(setLoading(false))
    }
  } )
}, [dispacth])

  return (
    <MainLayout/>
  )
}

export default App
