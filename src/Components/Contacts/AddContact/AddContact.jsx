import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContactServices from '../../ContactServices/ContactServices'

export const AddContact = () => {
  const navigate=useNavigate()
  let[state,setState]=useState({
      loading:false,
      contact:{
        name:"",
        photo:"",
        contact:"",
        email:"",
        title:"",company:"" 
        
      },
      groups:[],
      errorMessage:""
  })

  let updateInput=(event)=>{
    setState({...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
    }})
  }
    let{loading,contact,groups,errorMessage}=state;

    let submitForm=(event)=>{
      event.preventDefault()
      let promise=new Promise((res,rej)=>{
        let response=ContactServices.createContact(contact)
        res(response)
      })
      promise.then((res1)=>{
        if(res1){
          navigate("/contacts/list",{replace:true})
        }
        else{
          navigate("/contacts/add",{replace:false})
        }
      }).catch(()=>{
        alert("data is not found!!!")
      })
    }
  return (
    <>
    <pre>{JSON.stringify(contact)}</pre>
    <section className='edit-contact'>
      <div className='container p-3'>
        <div className='row'>
          <p className='fw-bold h4 text-primary'>Add Contact</p>
          <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt earum, eius voluptas excepturi 
          ipsam alias aliquid voluptatum cum impedit inventore magnam sunt fugit beatae, reiciendis et ullam quae porro velit.</p>
          </div>
        <div className='row d-flex align-items-center'>
          <div className='col-md-4'>
            <form action="" onSubmit={submitForm}>
              <div className="mb-2">
                <input type="text" name="name" required={true} value={contact.name} onChange={updateInput} placeholder="Name" id="" className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" name="Photo" required={true} value={contact.photo} onChange={updateInput} placeholder="Photo URL" id="" className='form-control' />
              </div>
              <div className="mb-2">
                <input type="number" name="Contact" required={true} value={contact.contact} onChange={updateInput} placeholder="Mobile" id="" className='form-control'/>
              </div>
              <div className="mb-2">
                <input type="email" name="Email" required={true} value={contact.email} onChange={updateInput} placeholder="Email" id="" className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" name="Company" required={true} value={contact.company} onChange={updateInput} placeholder="Company" id="" className='form-control'/>
              </div>
              <div className="mb-2">
                <input type="text" name="Title" required={true} value={contact.title} onChange={updateInput}  placeholder="Title" id="" className='form-control'/>
              </div>
              <div className="mb-2">
                <input type="text" name="GroupId" required={true} value={contact.groupId} onChange={updateInput} placeholder="Group" id="" className='form-control'/>
              </div>
              <div className="mb-2">
                <input type="Submit" value="Add" name=""   id="" className='btn btn-primary'/>
                <Link to='/' className='btn btn-warning ms-2'>CANCEL</Link>

              </div>
            </form>
          </div>
          <div className="col-md-8">
          <img src={contact.photo} alt="Image not found" className='img-fluid contact-img' />
            </div>
          </div>
      </div>

    </section>
    </>
  )
}