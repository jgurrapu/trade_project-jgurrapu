const model = require('../models/item');
const { DateTime } = require("luxon");

exports.index = (req, res) => {
    let tradeList = model.find();
    let category = model.category();
    res.render('./trades/index',{tradeList, category});
};

exports.new = (req, res) => {
    res.render('./trades/new');
};


exports.create = (req, res) => {
    console.log(req.body);
    let trade = req.body;
    model.save(trade);
    console.log(trade);
    res.redirect('/trades');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let findtrade = model.findById(id);
    if(findtrade){
        let tradeList = Object.assign({}, findtrade);
        res.render('./trades/show',{tradeList});
    }else{
        let err = new Error('Cannot find product with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let tradeList = model.findById(id);
    console.log(tradeList);
    if(tradeList){
        res.render('./trades/edit',{tradeList});
    }else{
        let err = new Error('Cannot edit product with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let tradeList = req.body;
    console.log("Update method", req.body)
    if(model.updateById(id, tradeList)){
        res.redirect('/trades/'+id);
    }else{
        let err = new Error('Cannot update product with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/trades');
    }else{
        let err = new Error('Cannot delete product with id '+id);
        err.status = 404;
        next(err);
    } 
};