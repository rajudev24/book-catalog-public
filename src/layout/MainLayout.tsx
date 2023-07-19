import Footer from "./Footer";
import Header from "./Header";
import {Outlet} from 'react-router-dom'


export default function MainLayout() {
  return (
    <div>
      <Header/>
      <div className="pt-8">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
