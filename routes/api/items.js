const express = require('express')
const router = express.Router()

const ItemModel = require('../../models/Item')

router.get('/', (req, res) => {
    ItemModel.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
    const newItem = new ItemModel({
        name: req.body.name
    })
    newItem.save()
        .then((item) => res.json(item))
})

router.delete('/:id', (req, res) => {
    ItemModel.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({success: true})))
        .catch((err) => res.status(404).json({success: false}))
})

module.exports = router