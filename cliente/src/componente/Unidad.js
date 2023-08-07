import React, { useEffect,useState,useRef,Component } from "react";
import { classNames } from 'primereact/utils';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import {Toast} from 'primereact/toast';
import servicio from '../servicio/UnidadServicio';

export default function Unidad() {
    let emptyRegistro = {
        id: null,
        descripcion: '',
        activo:true
    };
    var nombre = "UNIDAD";
    const [registros,setRegistros] = useState([]);
    const [registroDialog,setRegistroDialog] = useState(false);
    const [deleteRegistroDialog,setDeleteRegistroDialog] = useState(false);
    const [registro,setRegistro] = useState(emptyRegistro);
    const [submitted,setSubmitted] = useState(false);
    const toast = useRef(null);

    const onUpdate=()=>{
        servicio.getAll().then(response =>{
            if(response.status===200 && response.data.status===true){
                setRegistros(response.data.registros);
            }else{
                setRegistros([]);
            }
        });
    };
    useEffect(() => {
        onUpdate();
    }, []);
    const hideDeleteRegistroDialog = ()=> {
        setDeleteRegistroDialog(false);
    }

    const deleteRegistroDialogFooter = ()=>{
        return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRegistroDialog} />
                <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteRegistro} />
            </React.Fragment>
        );
    };
    const editRegistro = (_registro) => {
        setRegistro(_registro);
        setRegistroDialog(true);        
    }
    const confirmDeleteRegistro =(_registro) =>{
        setRegistro(_registro);
        setDeleteRegistroDialog(true);            
    }

    const deleteRegistro=async()=> {        
        var response=await servicio.delete(registro.id);
        if(response.data.registro){
            console.log(response.data.registro);
            let _registros = registros.filter(val => val.id !== registro.id);
            setRegistros(_registros);
            setDeleteRegistroDialog(false);
            setRegistro(emptyRegistro);
            toast.show({ severity: 'success', summary: 'Existo', detail: 'Registro Eliminado', life: 3000 });
        }else{
            toast.show({ severity: 'danger', summary: 'Error', detail: 'Registro no Eliminado', life: 3000 });
        }
    }
    const findIndexById=(id)=> {
        let index = -1;
        for (let i = 0; i < registros.length; i++) {
            if (registros[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    const saveRegistro =async()=> {
        setSubmitted(true);
        if (registro.descripcion.trim()) {
            let _registros = [...registros];
            let _registro = {...registro};
            let _registro2 = {...registro};
            if (_registro.id) {
                var id=_registro.id;
                delete _registro.id;
                var response=await servicio.update(id,_registro);                                
                var respuesta=response.data.registro;
                if(respuesta && respuesta[0]>=1){
                    const index = findIndexById(id);
                    _registros[index] = _registro2;
                    toast.show({ severity: 'success', summary: 'Exito', detail: 'Registro Actualizado', life: 3000 });
                }else{
                    toast.show({ severity: 'error', summary: 'Error', detail: 'Registro no Actualizado', life: 3000 });
                }
                
            }else {   
                var response=await servicio.create(registro);                
                _registro=response.data.registro;
                if(_registro){
                    _registros.push(_registro);
                    toast.show({ severity: 'success', summary: 'Exito', detail: 'Registro Creado', life: 3000 });
                }else{
                    toast.show({ severity: 'error', summary: 'Error', detail: 'Registro no Creado', life: 3000 });
                }
            }            
            setRegistros(_registros);
            setRegistroDialog(false);
            setRegistro(emptyRegistro);
        }
    }

    const registroDialogFooter =() =>{
        return(
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveRegistro} />
            </React.Fragment>
        )
    }
    const onInputChange =(e, name)=> {
        const val = (e.target && e.target.value) || '';
        let _registro = {...registro};
        _registro[`${name}`] = val;
        setRegistro(_registro);
    }
    const onCheckedChange = (e, name)=> {
        const val = e.checked;
        let _registro = {...registro};
        _registro[`${name}`] = val;
        setRegistro(_registro);
    }
    const hideDialog =() => {
        setSubmitted(false);
        setRegistroDialog(false);
    }

    const openNew =()=> {
        setRegistro(emptyRegistro);
        setSubmitted(false);
        setRegistroDialog(true);
    }
    const bodyAction = (rowData)=> {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" tooltip="Editar" className="p-button-rounded p-button-success mr-2" onClick={() => editRegistro(rowData)} />
                <Button icon="pi pi-trash" tooltip="Eliminar" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteRegistro(rowData)} />
            </React.Fragment>
        );
    }
    const bodyActivo =(rowData) => {
        if(rowData.activo==true){
            return (            
                <React.Fragment>
                    <Tag className="mr-2" icon="pi pi-check" severity="success" value="Activo"></Tag>
                </React.Fragment>        
            );
        }else{
            return (            
                <React.Fragment>
                    <Tag icon="pi pi-times" severity="danger" value="Inactivo"></Tag>
                </React.Fragment>        
            );
        }
    }
    const bodyNro =(rowData,props)=>{
        return props.rowIndex+1;
    }
    
    const leftToolbarTemplate=()=>{
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={()=>openNew} />
                {/*<Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />*/}
            </React.Fragment>
        )
    }
    return (
        <Card>
            <h1>{nombre}</h1>
            <Toast ref={toast} />
            <Fieldset legend="REGISTRADOS">
                <Card >
                    <Toolbar className="mb-4" start={leftToolbarTemplate} /*right={rightToolbarTemplate}*/></Toolbar>
                    <DataTable value={registros} responsiveLayout="stack" breakpoint="960px">
                        <Column header="Nro" body={bodyNro}></Column>
                        <Column field="descripcion" header="Descripcion" />
                        <Column field="activo" header="Activo" body={bodyActivo} />
                        <Column header="Acción" body={bodyAction}></Column>
                    </DataTable>
                </Card>
            </Fieldset>
            <Dialog visible={registroDialog} style={{ width: '450px' }} header={"DETALLE "+nombre} modal className="p-fluid" footer={registroDialogFooter} onHide={hideDialog}>
            <div className="field">
                <label htmlFor="descripcion">Descripcion</label>
                    <InputText id="descripcion" value={registro.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required autoFocus className={classNames({ 'p-invalid': submitted && !registro.descripcion })} />
                    {submitted && !registro.descripcion && <small className="p-error">Descripcion es requerida.</small>}
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="activo" checked={registro.activo} onChange={(e)=> onCheckedChange(e,"activo")} />
                    <label htmlFor="activo">Activo</label>
                </div>                    
            </Dialog>
            <Dialog visible={deleteRegistroDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteRegistroDialogFooter} onHide={hideDeleteRegistroDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {registro && <span>¿Estas seguro de eliminar <b>{registro.descripcion}</b>?</span>}
                </div>
            </Dialog>   
        </Card>           
    );
}