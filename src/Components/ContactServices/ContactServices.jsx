import axios from "axios"

export default class ContactServices {
    static serverUrl="http://localhost:7000"
    static getAllContacts(){
        let dataUrl=`${this.serverUrl}/contacts`
        return axios.get(dataUrl)
    }
        static getContact(contactId){
            let dataUrl=`${this.serverUrl}/contacts/${contactId}`;
            return axios.get(dataUrl)
    }
  
    static createContact(contact){
        let dataUrl=`${this.serverUrl}/contacts`;
        return axios.post(dataUrl,contact)
}
     
     static updateContact(contact,contactId){
    let dataUrl=`${this.serverUrl}/contacts/${contactId}`;
    return axios.post(dataUrl,contact);
}
    
      static deleteContact(contactId){
        let dataUrl=`${this.serverUrl}/contacts/${contactId}`;
        return axios.post(dataUrl,contactId);

      } 
}