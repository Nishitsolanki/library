const express = require("express")
const router = express.Router()
const {createuser,singleuser,alluser,updateuser,deletes} = require('../controller/artistcontroller')
const {createtrack ,gettrack ,updatetrack, singletrack, deletetrack,} = require('../controller/trackcontroller')


// artist
router.post('/create',createuser)
router.get('/artist/:id',singleuser)
router.get('/artist',alluser)
router.put('/artist/:id',updateuser)
router.delete('/artist/:id',deletes)


//track
router.post('/creates',createtrack)
router.get('/get',gettrack)
router.get('/track/:id',singletrack)
router.put('/track/:id',updatetrack)
router.delete('/track/:id',deletetrack)



module.exports = router