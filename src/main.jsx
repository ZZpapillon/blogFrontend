import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import BlogHome from './BlogHome.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './Posts.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <BlogHome />,
  },
  {
    path: "posts",
    element: <Posts />,
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
