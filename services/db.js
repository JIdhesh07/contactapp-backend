//import mongoose

const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/contact-details')

const contact=mongoose.model('contact',{

    address: {
        geolocation: {
          lat: String,
          long: String
        },
        city: String,
        street: String,
        number: String,
        zipcode: String
      },
      id: Number,
      email: String,
      username: String,
      password: String,
      name: {
        firstname: String,
        lastname: String
      },
      phone: String,
      __v: Number
})
module.exports={
    contact
}