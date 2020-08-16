const router = require("express").Router() 
const {getAllHistory,getHistoryById,postHistory,patchHistory} = require('../controller/history');

// [GET]
router.get("/", getAllHistory )
router.get("/:id", getHistoryById )//:id ->menandakan id yg dijalankan pada query param 

// [POST]
router.post('/', postHistory)

// [PATCH/PUT]
router.patch('/:id', patchHistory)



module.exports = router;