import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContactServices from '../../ContactServices/ContactServices'

export const EditContact = () => {
  let navigate=useNavigate()
  let {contactId} = useParams()
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      contact: "",
      email: "",
      title: "",
      company: "",
      groupId: "",
    },
    group: [],
    errorMessage: ""

  })

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true })
      let response = ContactServices.getContact(contactId)
      res(response)
    })
    promise.then((res1) => {
      setState({ ...state, loading: false, contact: res1.data })
      console.log(res1.data)
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: "data is not available!" })

    })
  }, [contactId])

  const updateInput = (event) => {
    setState({
      ...state, contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }

  let{loading, contact, groupId, errorMessage}=state

  const submitForm = (event) => {
    event.preventDefault()
    let promise = new Promise((res, rej) => {
      setState({...state, loading:true})
      let response = ContactServices.updateContact(contact, contactId)
      res(response)
    })
    promise.then((res1) => {
      if (res1) {
        navigate("/", { replace: true })
      } else {
        navigate(`contacts/edit/${contactId}`, { replace: false })
      }
    })
      .catch(() => {
        alert("data is not added")
      })
  }
  return (
    <div>
      <pre>{JSON.stringify(contact)}</pre>
      <section className="edit-contact">
        <div className="container p-3">
          <div className="row">
            <p className="fw-bold h4 text-primary ">Edit Contact</p>
            <p className="fst-italic">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde accusantium pariatur corporis rerum perspiciatis quas molestiae vero minus asperiores? Illo nam placeat, et illum animi accusamus accusantium nulla veniam iusto!
            </p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" name='name' onChange={updateInput} value={contact.name} placeholder='Name' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='photo' onChange={updateInput}  value={contact.photo} placeholder='Photo URL' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="number" name='contact' onChange={updateInput}  value={contact.contact} placeholder='Mobile' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="email" name='email' onChange={updateInput}  value={contact.email} placeholder='Email' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='company' onChange={updateInput}  value={contact.company} placeholder='Company' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='title' onChange={updateInput}  value={contact.title} placeholder='Title' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="text" name='groupId' onChange={updateInput}  value={contact.groupId} placeholder='Group Id' className='form-control' />
                </div>
                <div className="mb-2">
                  <input type="submit" value={'Update'} className='btn btn-primary' />
                  <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
            <div className="col-md-8">
              <img src={contact.photo}  className='img-fluid contact-img' alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

