const express = require('express')
const router = express.Router()
const User = require('../models/user')
const ObjectId = require("mongodb").ObjectID;
//Get Method
router.get('/',async (req,res)=>{
try{
const subscribers = await User.find()
res.json(subscribers)
}catch(err){
res.status(500).json({ message:err.message })
}
})

//Get Method with query params
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.user)
})

//Post Method
router.post('/',async (req,res)=>{
  const user = new User({
    name: req.body.name,
    email:req.body.email
  })
try{
const newUser = await user.save()
res.status(201).json(newUser)
}catch(err){
res.status(400).json({message:err.message})
}
})

//Patch Method with param
router.patch('/:id',getSubscriber, async (req,res)=>{
if(req.body.name!=null){
  res.user.name = req.body.name
}
if(req.body.email!= null){
  res.user.email = req.body.email
}
  try{
    const savedUser = await res.user.save()
    res.status(200).json(savedUser)
}catch(err){
  res.status(500).json({message:err.message})
}
})

//Delete Method
router.delete('/:id',getSubscriber, async (req,res)=>{
  try{
    await res.user.remove()
    res.json({message:'Deleted Successfully'})
  }catch(err){
    res.status(500).json({message:err.message})
  }
})

async function getSubscriber(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router