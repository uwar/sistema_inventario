const express=require("express");
const {
    getAll,
    create,
    update,
    destroy
}=require("../controller/ProductoController");
/*
const{
    verifyTokenPlantel
}=require("../router/validate/Autorizacion");*/
const router=express.Router();
var root="producto"
router.get("/"+root+"/all",getAll);
router.post("/"+root+"/create",create);
router.put("/"+root+"/update/:id",update);
router.delete("/"+root+"/destroy/:id",destroy);
module.exports={
    routes:router
}