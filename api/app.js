const express = require('express')
const app = express()
const {v4} = require('uuid')
const path = require('path')

let CONTACTS = [
    {
        id: v4(),
        name:"Nurbek",
        img:"https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg",
        surname: "Abdurahimov",
        course: "Business Information Systems"
    }
]

app.use(express.json())

app.get('/api/contacts', (req, res)=>{
    res.status(200).json(CONTACTS)
})
app.delete('/api/contacts/:id', (req, res)=>{
   CONTACTS = CONTACTS.filter(c=>c.id !=req.params.id)
    res.status(200).json({message: 'Contact was delete successfuly'})
})
app.post('/api/contacts',(req, res) => {
  const contact = {...req.body, id:v4()}
    CONTACTS.push(contact)
    res.status(200).json({contact})
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res)=>{
    res.sendFile( path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(5000,()=> console.log('Server has been started on port 5000....') )