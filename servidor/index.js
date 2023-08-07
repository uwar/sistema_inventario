var http = require('http');
const express = require("express");
const unidadRouter = require("./router/UnidadRouter");
const categoriaRouter = require("./router/CategoriaRouter");
const productoRouter = require("./router/ProductoRouter");
const areaRouter = require("./router/AreaRouter");
/*const proveedorRouter = require("./router/ProveedorRouter");
const representanteRouter = require("./router/RepresentanteRouter");*/
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
app.get("/", (req, resp) => resp.send("application is up and running"));
app.use("/api", unidadRouter.routes);
app.use("/api", categoriaRouter.routes);
app.use("/api", productoRouter.routes);
app.use("/api", areaRouter.routes);
//app.use("/api", proveedorRouter.routes);
//app.use("/api", representanteRouter.routes);
//app.use("/api", tipoEvaluacionRouter.routes);
//app.use("/api", configuracionTipoEvaluacionRouter.routes);
//app.use("/api", configuracionEvaluacionRouter.routes);
//app.use("/api", tipoTramiteRouter.routes);
//app.use("/api", registroLegalizacionRouter.routes);
//app.use("/api", cargoTramiteRouter.routes);
const PORT=3000;
app.listen(PORT, () => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
});