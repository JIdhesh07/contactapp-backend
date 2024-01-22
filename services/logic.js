const { response } = require('express')
const db = require('../services/db')

const getAllUsers=()=>{
    return db.contact.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                contacts:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'user not found'
            }
        }
    })
}


const addcontact=(id,firstname,lastname,phone,email,Password,username,city,street,number,Zipcode,Latitude,Longitude)=>{

    return db.contact.findOne({id}).then((result)=>{

        //if id is present in db

        if(result){

        return{

            statusCode:404,
            message:"contact already exit"
        }    
        }
        else{
            const contactData = {
                address: {
                      geolocation: {
                          lat: Latitude,
                          long:Longitude ,
     
                      },
                      city: city,
                      street: street,
                      number: number,
                      zipcode: Zipcode,
                  },
                  id: id,
                  name: {
                      firstname: firstname,
                      lastname: lastname,
                  },
                  email: email,
                  username: username,
                  password:Password ,
                  phone: phone,
              }
        //if id is not prsent in db
        const newcontact=new db.contact(contactData)

newcontact.save()
return{

    statusCode:200,
    message:"contact Added sucessfully"
}

        }
    })
}



//LOGIC FOR DELETE 

 const deletecontact =(id)=>{
  return db.contact.deleteOne({id}).then((result)=>{


    if(result){

    
      return{


         statusCode:200,
         message:"contact delete scuccessfully"
      }
    }
  })
  .catch((error)=>{

return{

    statusCode:401,
    message:" can't delete the contact details "
}

  })

 }
 

 //logic for get a contact details
 const getancontact=(id)=>{
    return db.contact.findOne({id}).then((result)=>{ //-->all contact details
        if(result){
            return{
                statusCode:200,
                contacts:result// contact details object
            }
        }
        else{
            return{// send to frontend
                statusCode:404,
                message:'user not found'
            }
        }
    })
}


//update  contact
const updateUser = (id,firstname,lastname,phone,email,Password,username,city,street,number,Zipcode,Latitude,Longitude) => {
    return db.user.findOne({ id })
        .then((user) => {
            if (!user) {
                return {
                    statusCode: 404,
                    message: 'User not found',
                };
            }

            // Update user data
            user.address = {
                geolocation: {
                    lat: Latitude,
                    long: Longitude,
                },
                city: city,
                street: street,
                number: number,
                zipcode: Zipcode,
            };
            user.name = {
                firstname: firstname,
                lastname: lastname,
            };
            {user.email = email; // Update email
            user.username = username; // Update username
            user.password = Password; // Update password
            user.phone = phone;} ;// Update phone

            // Save the updated user document
            return user.save()
                .then((updatedUser) => {
                    return {
                        statusCode: 200,
                        message: 'Details updated successfully',
                        updatedUser: updatedUser.toObject(),
                    };
                })
                .catch((error) => {
                    return {
                        statusCode: 500,
                        message: 'Internal server error while saving updated user',
                        error: error.message,
                    };
                });
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: 'Internal server error while updating user',
                error: error.message,
            };
        });
};

 module.exports={
    getAllUsers,
    addcontact,
    deletecontact,
    getancontact,
    updateUser
    
   
 }









  










