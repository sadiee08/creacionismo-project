import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

import './style.css'

export default function BasicTable(selectedValues) {

  if (selectedValues.selectedValues && selectedValues.selectedValues.length > 0) {

    console.log(selectedValues)
    let data = selectedValues.selectedValues
    console.log(data)

    const deleteValue = (value) => {
      data = data.filter((item) => item !== value)
    }

    return (
      <TableContainer component={Paper} className='table-margin'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='text-head'>Producto</TableCell>
              <TableCell className='text-head' align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {value}
                </TableCell>
                <TableCell align="right">
                  <button className='btn-delete' onClick={() => deleteValue(value)}>
                    <DeleteIcon style={{ fontSize: '18px' }}></DeleteIcon>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}