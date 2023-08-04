const express=require("express");
const {
    getAll,
    getAllActivas,
    create,
    update,
    destroy
}=require("../controller/CategoriaController");
/*
const{
    verifyTokenPlantel
}=require("../router/validate/Autorizacion");*/
const router=express.Router();
router.get("/categoria/all",getAll);
router.get("/categoria/activas",getAllActivas);
router.post("/categoria/create",create);
router.put("/categoria/update/:id",update);
router.delete("/categoria/destroy/:id",destroy);
module.exports={
    routes:router
}