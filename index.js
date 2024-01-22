const express=require('express')
const cors=require('cors')
const logic=require('./services/logic')


const contactserver=express()
contactserver.use(cors({
    origin:'http://localhost:3000'
}))
contactserver.use(express.json())
//port number
contactserver.listen(8000,()=>{
    console.log("contactserver listening on the port 8000");
})
contactserver.get('/get-all-contact',(req,res)=>{
    logic.getAllUsers().then((response)=>{
        res.status(response.statusCode).json(response)
    })
    
    //add conatc
})
contactserver.post('/add-contact',(req,res)=>{

    logic.addcontact(req.body.id,req.body.firstname,req.body.lastname,req.body.phone,req.body.email,req.body.Password,req.body.usename,req.body.city,req.body.street,req.body.number,req.body.Zipcode,req.body.Latitude,req.body.Longitude).then((response)=>{


        res.status(response.statusCode).json(response)
    })
})

//delete
 contactserver.delete('/delete-contact/:id',(req,res)=>{


    logic.deletecontact(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)


    })
 })

// get an contact details


contactserver.get('/get-an-contact/:id',(req,res)=>{
    logic.getancontact(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
    
})



//UPADTE CONTACT
contactserver.post('/update-user/:id', (req, res) => {
    logic.updateUser(
        req.params.id,
        req.body.firstname,
        req.body.lastname,
        req.body.lat,
        req.body.long,
        req.body.city,
        req.body.street,
        req.body.number,
        req.body.zipcode,
        req.body.email,
        req.body.username,
        req.body.password,
        req.body.phone
    ).then((response) => {
        res.status(response.statusCode).json(response);
    });
});
