const express=require("express");
const {
    getAll,
    getAllActivas,
    create,
    update,
    destroy
}=require("../controller/AreaController");
/*
const{
    verifyTokenPlantel
}=require("../router/validate/Autorizacion");*/
const router=express.Router();
router.get("/area/all",getAll);
router.get("/area/activas",getAllActivas);
router.post("/area/create",create);
router.put("/area/update/:id",update);
router.delete("/area/destroy/:id",destroy);
module.exports={
    routes:router
}