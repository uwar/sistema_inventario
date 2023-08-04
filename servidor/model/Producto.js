const { Model, DataTypes } = require("sequelize");
const sequelize = require("../model/db/DataBase");
const categoria =require("../model/Categoria")
const unidad = require("../model/Unidad");
class Producto extends Model{

};

Producto.init(
    {
        id:{
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        codigoBarra:{
            field:"codigo_barra",
            type: DataTypes.STRING(20),
            allowNull:true,
            defaultValue: ""
        },
        codigoItem:{
            field:"codigo_item",
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
            defaultValue: ""
        },
        descripcion:{
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true,
            defaultValue: ""
        },
        categoriaId:{
            field:"categoria_id",
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categoria',
                key: 'id'
            }
        },
        unidadId:{
            field:"unidad_id",
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Unidad',
                key: 'id'
            }
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        precioUnidad:{
            field:"precio_unidad",
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue:0
        },
        precioUnidadFacturado:{
            field:"precio_unidad_facturado",
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue:0
        },
        minimo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        maximo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        fechaInicial:{
            field:"fecha_inicial",
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaFinal:{
            field:"fecha_final",
            type: DataTypes.DATE,
            allowNull: true
        },
        cantidadInicial:{
            field:"cantidad_inicial",
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        cantidadFinal:{
            field:"cantidad_final",
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
        }
    },{
        sequelize,
        modelName:'Producto', 
        tableName:'producto',
        timestamps:false
    }
);
unidad.hasOne(Producto,{ as:"unidad",foreignKey: 'unidadId' });
Producto.belongsTo(unidad,{as:"unidad", foreignKey: 'unidadId' });
categoria.hasOne(Producto,{ as:"categoria",foreignKey: 'categoriaId' });
Producto.belongsTo(categoria,{ as:"categoria",foreignKey: 'categoriaId' });
module.exports=Producto;