import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ContactServices from '../../ContactServices/ContactServices';
import Spinner from '../../Spinner/Spinner'

export const ViewContact = () => {
  let { contactId } = useParams();
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: ""
  })

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true })
      let response = ContactServices.getContact(contactId);
      res(response)
    })
    promise.then((res1) => {
      setState({ ...state, loading: false, contacts: res1.data })
      console.log(res1.data)
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: "data is not available!" })

    })
  }, [contactId])

  let { loading, contacts, errorMessage } = state;
  return (
    <div>
      {/* <h2>{contactId}</h2> */}
      <section className="view-contact">
        <div className="container p-3">
          <div className="row">
            <p className="h3 text-warning">
              View Contact
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta, excepturi voluptatibus maxime blanditiis est sequi unde nemo ipsam cupiditate sit eos nobis ex nam. Explicabo totam rerum impedit nam?</p>
          </div>
        </div>
      </section>
      {

        loading ? <Spinner /> : <React.Fragment>
          {
            Object.keys(contacts).length > 0 &&
            <section className="view-contact my-3">
              <div className="container align-items-center">
                <div className="row">
                  <div className="col-md-4 my-3">
                    <img src={contacts.photo} alt="" className='img-fluid contact-img' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">Name: <span className='fw-bold ms-1'>{contacts.name}</span></li>
                      <li className="list-group-item list-group-item-action">Email: <span className='fw-bold ms-1'>{contacts.email}</span></li>
                      <li className="list-group-item list-group-item-action">Contact: <span className='fw-bold ms-1'>{contacts.contact}</span></li>
                      <li className="list-group-item list-group-item-action">Company: <span className='fw-bold ms-1'>{contacts.company}</span></li>
                      <li className="list-group-item list-group-item-action">Title: <span className='fw-bold ms-1'>{contacts.title}</span></li>
                      <li className="list-group-item list-group-item-action">Group: <span className='fw-bold ms-1'>{contacts.groupId}</span></li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <Link to={'/'} className='btn btn-warning my-2'> Back</Link>
                  </div>
                </div>
              </div>
            </section>
          }
        </React.Fragment>
      }

    </div>
  )
}

