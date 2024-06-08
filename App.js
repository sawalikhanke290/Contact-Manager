import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import {ContactList} from './Components/Contacts/ContactList/ContactList';
import {AddContact} from './Components/Contacts/AddContact/AddContact'
import {EditContact} from './Components/Contacts/EditContact/EditContact'
import {ViewContact} from './Components/Contacts/ViewContact/ViewContact'
import {NavBar} from './Components/NavBar/NavBar'

const App = () => {
  return (
    <div>
      <NavBar/> 
       <Routes>
        <Route path='/' element={<Navigate to={'/Contacts/list'}/>}/>
        <Route path='/Contacts/list' element={<ContactList/>}/>
        <Route path='/Contacts/add' element={<AddContact/>}/>
        <Route path='/Contacts/edit/:contactID' element={<EditContact/>}/>
        <Route path='/Contacts/view/:contactID' element={<ViewContact/>}/>
       </Routes>
    </div>
  )
}
export default App;

