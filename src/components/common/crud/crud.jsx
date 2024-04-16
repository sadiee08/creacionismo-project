import React, { useState, useEffect } from 'react';
import "./styles.css";

import { db } from '../../../firebase/config';
import { addDoc, collection, serverTimestamp, onSnapshot, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';

import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import * as xlsx from 'xlsx';

const Crud = ({ producto, titulo }) => {
    const [data, setData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        size: '',
        color: '',
        total: 0,
        price: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const add = async (e) => {
        e.preventDefault();
        try {
            const res = await addDoc(collection(db, producto), {
                ...formData,
                timeStamp: serverTimestamp()
            });

            setFormData({
                name: '',
                description: '',
                size: '',
                color: '',
                total: 0,
                price: 0,
            });
            handleClose();

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, producto),
            (snapShot) => {
                let list = [];
                let idAux = 1;
                let listTable = []

                snapShot.docs.forEach((doc) => {
                    list.push({ id: idAux, idGuid: doc.id, ...doc.data() });
                    idAux++;
                });
                //setData(list); Tiene TODOS los datos
                listTable = list

                for (var i = 0, len = listTable.length; i < len; i++) {
                    delete listTable[i].timeStamp;
                    delete listTable[i].description;
                }

                setData(listTable);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, producto, id));
            setData(data.filter((item) => item.idGuid !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddProduct = async (id) => {
        try {
            const productoSeleccionado = doc(db, producto, id);
            await updateDoc(productoSeleccionado, {
                total: increment(1)
            });

        } catch (err) {
            console.log(err);
        }
    }

    const handleRemoveProduct = async (id) => {
        try { 
            const productoSeleccionado = doc(db, producto, id);
            await updateDoc(productoSeleccionado, {
                total: increment(-1)
            });

        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'size', headerName: 'Tamaño', width: 130 },
        { field: 'color', headerName: 'Color', width: 130 },
        { field: 'total', headerName: 'Cantidad', width: 100 },
        { field: 'price', headerName: 'Precio', width: 100 },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 190,
            display: 'flex',
            alignItems: 'center',
            direction: "rtl",
            renderCell: (params) => {
                return (
                    <div className='actions-display-crud'>
                        <button onClick={() => handleAddProduct(params.row.idGuid)}>
                            <AddIcon style={{ fontSize: '18px' }}></AddIcon>
                        </button>
                        <button onClick={() => handleRemoveProduct(params.row.idGuid)}>
                            <RemoveIcon style={{ fontSize: '18px' }}></RemoveIcon>
                        </button>
                        <button onClick={() => handleDelete(params.row.idGuid)}>
                            <DeleteIcon style={{ fontSize: '18px' }}></DeleteIcon>
                        </button>

                    </div>
                );
            },
        },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const sizes = [
        {
            value: 'Chico',
        },
        {
            value: 'Mediano',
        },
        {
            value: 'Grande',
        },
        {
            value: 'No aplica',
        },
    ];

    const generateExcel = () => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, worksheet, titulo); // Replace 'My Sheet' with your desired sheet name
        const excelBuffer = xlsx.write(wb, { type: 'buffer' });
      
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const file = URL.createObjectURL(blob);
        window.open(file);
    };

    return (
        <>
            <div className='display-crud'>
                <div className='button-display-crud'>
                    <div className='header-display-crud'>
                        <h1>{titulo}</h1>

                        <div>
                            <button onClick={handleOpen}>
                                Agregar nuevo
                            </button>
                            <button onClick={generateExcel}>
                                Exportar a Excel
                            </button>

                        </div>
                        
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={add}>
                                <div className='title-close-crud'>
                                    <h2> Agregar producto </h2>
                                    <div className='close-icon'>
                                        <CloseIcon onClick={handleClose} style={{ fontSize: '25px' }}></CloseIcon>
                                    </div>
                                </div>

                                <div>
                                    <TextField className='modal-style-crud' id="outlined-basic" label="Nombre" variant="outlined" type="text" name="name" onChange={handleInputChange} value={formData.name} />
                                    <TextField className='modal-style-crud' id="outlined-basic" label="Descripción" variant="outlined" type="text" name="description" onChange={handleInputChange} value={formData.description} />

                                    <TextField
                                        className='modal-style-crud'
                                        id="outlined-select-currency"
                                        select
                                        defaultValue=""
                                        name="size"
                                        label="Tamaño"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                    >
                                        {sizes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField className='modal-style-crud' id="outlined-basic" label="Color" variant="outlined" type="text" name="color" onChange={handleInputChange} value={formData.color} />

                                    <div className='display-textfield'>
                                        <TextField className='modal-style-crud text' id="outlined-basic" label="Cantidad" variant="outlined" type="number" name="total" onChange={handleInputChange} value={formData.total} />
                                        <TextField className='modal-style-crud text' id="outlined-basic" label="Precio" variant="outlined" type="number" name="price" onChange={handleInputChange} value={formData.price} />
                                    </div>
                                    <div className='button-modal-style-crud'>
                                        <button type="submit">Crear</button>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </div>


                <div className='table-style-crud'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>


        </>
    )
}

export default Crud;
