const express=require("express");
const {
    getAll,
    getAllActivas,
    create,
    update,
    destroy
}=require("../controller/UnidadController");
/*
const{
    verifyTokenPlantel
}=require("../router/validate/Autorizacion");*/
const router=express.Router();
router.get("/unidad/all",getAll);
router.get("/unidad/activas",getAllActivas);
router.post("/unidad/create",create);
router.put("/unidad/update/:id",update);
router.delete("/unidad/destroy/:id",destroy);
module.exports={
    routes:router
}