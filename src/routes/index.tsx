import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import Register from "../page/Register";
import AllBooks from "../page/AllBooks";
import NotFound from "../page/NotFound";
import BookDetails from "../page/BookDetails";
import Home from "../page/Home";
import AddBook from "../page/AddBook";
import EditBook from "../page/EditBook";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter ([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/all-books',
                element: <AllBooks/>
            },
            {
                path: '/add-new-book',
                element: <PrivateRoute> <AddBook/> </PrivateRoute> 
            },
            {
                path: '/all-books/:id',
                element: <BookDetails/>
            },
            {
                path: '/all-books/edit',
                element: <EditBook/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            
        ]
    },
  
    {
        path: '*',
        element: <NotFound/>
    },
])

export default routes