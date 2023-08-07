import http from "../servicio/Servicio"
class UnidadServicio{
    nombre="unidad";
    getAll= () => {
        return http.get("/api/"+this.nombre+"/all");
    }
    getActivos=(data)=>{
        return http.get("/api/"+this.nombre+"/activas");
    }
    update=(id,data)=>{
        return http.put("/api/"+this.nombre+"/update/"+id, data);
    }
    create=(data)=>{
        return http.post("/api/"+this.nombre+"/create", data);
    }
    delete=(id)=>{
        return http.delete("/api/"+this.nombre+"/destroy/"+id);
    }
    
}
export default new UnidadServicio();