import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import BasicTable from "../../components/common/basic-table"

import { db } from '../../firebase/config'
import { addDoc, collection, serverTimestamp, onSnapshot, deleteDoc, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';

import { DataGrid } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

import emailjs from '@emailjs/browser';

const Pedido = () => {

    const producto = 'pedidos';
    const titulo = 'Pedidos';

    const [idEdit, setIdEdit] = useState(0);

    const [data, setData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [searchResults, setSearchResults] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        cellphone: '',
        email: '',
        trackingNumber: '',
        status: '',
        paymentStatus: '',
        total: 0,
        products: []
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
                products: selectedValues,
                timeStamp: serverTimestamp()
            });

            if (formData.status === 'Enviado') {
                handleSendMail(formData.email, formData.name);
            }

            setFormData({
                name: '',
                cellphone: '',
                email: '',
                trackingNumber: '',
                status: '',
                paymentStatus: '',
                total: 0
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

    const handleEdit = async (id) => {
        handleOpenEdit();

        try {
            const docRef = doc(db, producto, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFormData(docSnap.data());
                setIdEdit(id);
            }

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

                        <button onClick={() => handleEdit(params.row.idGuid)}>
                            <ModeEditIcon style={{ fontSize: '18px' }}></ModeEditIcon>
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
        width: 700,
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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene la recarga de la página
        const docRef = doc(db, producto, idEdit);

        try {
            await updateDoc(docRef, {
                ...formData
            });
            handleCloseEdit();
            //limpiar formulario
            setFormData({
                name: '',
                cellphone: '',
                email: '',
                trackingNumber: '',
                status: '',
                paymentStatus: '',
                total: 0,
                products: []
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const collections = ['maceta-aire', 'maceta-ceramica', 'maceta-concreto', 'maceta-tierra', 'pedestales'];
            let combinedData = [];

            for (const collectionName of collections) {
                const collectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                combinedData = [...combinedData, ...data];
            }

            setSearchResults(combinedData); // Set initial results without filtering
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only once on component mount

    const handleSearchChange = (event, value) => {
        if (value) {
          setSelectedValues([...selectedValues, value]);
        }
        console.log(selectedValues);
    };

    const handleSendMail = async (email, name) => {
        const mail = {
            from: "abbysosa408@gmail.com",
            to: email,
            subject: "Pedido enviado",
            text: "Su pedido ha sido enviado",
            name: name
        };

        try {
            await emailjs.send('service_6670l3k', 'template_d67w6om', mail, 'pY7FcAmEEru1Uqgdj');
            console.log('Email sent successfully');
        } catch (error) {
            console.log('Failed to send email', error.text);
        }
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
                                        <div className='display-textfield'>
                                            <TextField className='modal-style text' id="outlined-basic" label="Nombre" variant="outlined" type="text" name="name" onChange={handleInputChange} value={formData.name} />
                                            <TextField className='modal-style text' id="outlined-basic" label="Correo" variant="outlined" type="email" name="email" onChange={handleInputChange} value={formData.email} />
                                        </div>

                                        <div className='display-textfield'>
                                            <TextField className='modal-style text' id="outlined-basic" label="Teléfono" variant="outlined" type="tel" name="cellphone" onChange={handleInputChange} value={formData.cellphone} />
                                            <TextField className='modal-style text' id="outlined-basic" label="No. Rastreo" variant="outlined" type="text" name="trackingNumber" onChange={handleInputChange} value={formData.trackingNumber} />
                                        </div>

                                        <div className='display-textfield'>
                                            <TextField
                                                className='modal-style text-3'
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
                                                className='modal-style text-3'
                                                id="outlined-select-currency"
                                                select
                                                defaultValue=""
                                                name="status"
                                                label="Estatus de envío"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                {status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField className='modal-style text-3' id="outlined-basic" label="Total a pagar" variant="outlined" type="number" name="total" onChange={handleInputChange} value={formData.total} />

                                        </div>

                                        <div>
                                            <Autocomplete
                                                className='modal-style text'
                                                freeSolo
                                                id="free-solo-2-demo"
                                                disableClearable
                                                options={searchResults.map((option) => option.name)}
                                                onChange={handleSearchChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Search input"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        }}
                                                    />
                                                )}
                                            />

                                            <BasicTable selectedValues={selectedValues} />
                                        </div>


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

                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={handleSubmit}>
                                <div className='title-close'>
                                    <h2> Editar pedido </h2>
                                    <div className='close-icon'>
                                        <CloseIcon onClick={handleCloseEdit} style={{ fontSize: '25px' }}></CloseIcon>
                                    </div>
                                </div>

                                <div>
                                    <TextField className='modal-style' id="outlined-basic" label="Nombre" variant="outlined" type="text" name="name" onChange={handleInputChange} value={formData.name} />
                                    <TextField className='modal-style' id="outlined-basic" label="Correo" variant="outlined" type="email" name="email" onChange={handleInputChange} value={formData.email} />

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
                                            label="Estatus de envío"
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

                                    <TextField className='modal-style' id="outlined-basic" label="Total a pagar" variant="outlined" type="number" name="total" onChange={handleInputChange} value={formData.total} />

                                    <BasicTable selectedValues={formData.products} />

                                    <div className='button-modal-style'>
                                        <button type="submit">Editar</button>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </Modal>

                </div>

            </div>
        </div>
    )
}

export default Pedido;