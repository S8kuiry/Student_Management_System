
import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';

import StudentForm from './pages/StudentForm/StudentForm';
import EditStudents from './pages/StudentForm/EditStudents';
import StudentCard from './pages/student_card/StudentCard';
import DisplayStatus from './pages/DisplayStatus/DisplayStatus';
import FrontPage from './pages/Front_Page/FrontPage';

const  myRouter = createBrowserRouter([
  {path:`/home/:id`,element:<Home/>},
  {path:'/signup',element:<SignUp/>},
  {path:'/editstudents/:id',element:<EditStudents/>},
  
  {path:'/studentform/:id',element:<StudentForm/>},
  {path:'/studentcard/:id', element:<StudentCard/>},
  {path:'/displaystatus/:id', element:<DisplayStatus/>},
  {path:'/',element:<FrontPage/>}



])
const App = () => {
 
  return (
    <div>
      <RouterProvider router={myRouter} />
      
    </div>
  )
}

export default App
