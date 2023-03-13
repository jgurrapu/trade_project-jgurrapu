const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');

//GET /tradeList: send all tradeList to the user
router.get('/', controller.index);

//GET /tradeList/new: send html form for creating a new trade
router.get('/new', controller.new);

//POST /tradeList: create a new trade
router.post('/', controller.create);

//GET /tradeList/:id: send details of trade identified by id
router.get('/:id', controller.show);

//GET /tradeList/:id: send html form for editing an existing trade
router.get('/:id/edit', controller.edit);

//PUT /tradeList/:id: update the trade identified by id
 router.put('/:id', controller.update);

//DELETE /tradeList/:id: delete the trade identified by id
router.delete('/:id', controller.delete);

module.exports=router;  