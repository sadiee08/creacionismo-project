import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from "../../components/menu/menu";
import Header from "../../components/header";

import { db } from '../../firebase/config'
import { addDoc, collection, serverTimestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

import { DataGrid } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Pedido = () => {

    const producto = 'pedidos';
    const titulo = 'Pedidos';

    const [data, setData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        name: '',
        cellphone: '',
        email: '',
        trackingNumber: '',
        status: '',
        paymentStatus: '',
        total: 0,
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
                cellphone: '',
                email: '',
                trackingNumber: '',
                status: '',
                paymentStatus: '',
                total: 0,
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

    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'name', headerName: 'Nombre', width: 190 },
        { field: 'status', headerName: 'Estatus de envío', width: 150 },
        { field: 'trackingNumber', headerName: 'No. Rastreo', width: 120 },
        { field: 'paymentStatus', headerName: 'Estatus de pago', width: 150 },
        { field: 'total', headerName: 'Total', width: 100 },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 100,
            display: 'flex',
            alignItems: 'center',
            renderCell: (params) => {
                return (
                    <div className='actions-display'>
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
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const status = [
        {
            value: 'En proceso',
        },
        {
            value: 'Enviado',
        },
        {
            value: 'Entregado',
        }
    ];

    const paymentStatus = [
        {
            value: 'Pendiente',
        },
        {
            value: 'Pagado',
        }
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
        <div>
            <Header />
            <div className="display-menu">
                <Menu />
                <div className='display'>
                    <div className='button-display'>
                        <div className='header-display'>
                            <h1>{titulo}</h1>

                            <div>
                                <button onClick={handleOpen}>
                                    Agregar nuevo
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
                                    <div className='title-close'>
                                        <h2> Crear pedido </h2>
                                        <div className='close-icon'>
                                            <CloseIcon onClick={handleClose} style={{ fontSize: '25px' }}></CloseIcon>
                                        </div>
                                    </div>

                                    <div>
                                        <TextField className='modal-style' id="outlined-basic" label="Nombre" variant="outlined" type="text" name="name" onChange={handleInputChange} value={formData.name} />
                                        <TextField className='modal-style' id="outlined-basic" label="Correo" variant="outlined" type="text" name="email" onChange={handleInputChange} value={formData.email} />

                                        <div className='display-textfield'>
                                            <TextField className='modal-style text' id="outlined-basic" label="Teléfono" variant="outlined" type="tel" name="cellphone" onChange={handleInputChange} value={formData.cellphone} />
                                            <TextField className='modal-style text' id="outlined-basic" label="No. Rastreo" variant="outlined" type="text" name="trackingNumber" onChange={handleInputChange} value={formData.trackingNumber} />
                                        </div>

                                        <div className='display-textfield'>
                                            <TextField
                                                className='modal-style text'
                                                id="outlined-select-currency"
                                                select
                                                defaultValue=""
                                                name="paymentStatus"
                                                label="Estatus de pago"
                                                value={formData.paymentStatus}
                                                onChange={handleInputChange}
                                            >
                                                {paymentStatus.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                className='modal-style text'
                                                id="outlined-select-currency"
                                                select
                                                defaultValue=""
                                                name="status"
                                                label="Estatus"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                {status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <TextField className='modal-style' id="outlined-basic" label="Cantidad" variant="outlined" type="number" name="total" onChange={handleInputChange} value={formData.total} />

                                        <div className='button-modal-style'>
                                            <button type="submit">Crear</button>
                                        </div>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                    </div>


                    <div className='table-style'>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Pedido;