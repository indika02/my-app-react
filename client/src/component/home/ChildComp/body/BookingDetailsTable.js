import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Axios from 'axios';

export default function BookingTable() {

  /*DeleteButton */
  /*Dialog Alerts  */
  const [delopen, setDelOpen] = React.useState(false);

  const DelhandleClickOpen = () => {
    setDelOpen(true);
  };

  const DelhandleClose = () => {
    setDelOpen(false);
  };
  /*Dialog Alerts  */
  function DeleteButton() {
    return (
      < Button
        onClick={DelhandleClickOpen}
        variant="contained"
      >< DeleteIcon /></Button>);
  }
  /*DeleteButton */
  /*AddButton */
                                              /*Dialog Alerts  */
  const [Addopen, setAddOpen] = React.useState(false);

  const AddhandleClickOpen = () => {
    setAddOpen(true);
  };

  const AddhandleClose = () => {
    setAddOpen(false);
  };
                                              /*Dialog Alerts  */
  function AddButton() {
    return (
      < Button
        onClick={AddhandleClickOpen}
        variant="contained"
      >< AddIcon /></Button>);
  }
  /*AddeButton */

  /*Booking Details Table */
  const Boockingcolumns = [
    { field: 'id', headerName: 'id', width: 130 },
    {
      field: 'Acction',
      headerName: 'Acction',
      width: 130,
      renderCell: (params) => (
        <DeleteButton />
      ),
    },
    { field: 'type', headerName: 'Vehicle', width: 130 },
    { field: 'date', headerName: 'Date And Time', width: 170 },
    { field: 'from', headerName: 'From', width: 170 },
    {
      field: 'To',
      headerName: 'To',
      type: 'number',
      width: 170,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'discription',
      headerName: 'Discription',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'dateAndTimeOfBooking',
      headerName: 'Date Of Booked',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    }      
  ];

  const [bookingDetails, setbookingDetails] = useState([]);
   useEffect(() => {
       Axios.post("http://localhost:3001/api/BookingDetails").then((response) => {
        setbookingDetails(response.data)
       })
   },[]);    
  
   const Boockingrows = bookingDetails.map((val, index, array) => ({
    id:index,
    type:val.type,
    date:val.date,
    from:val.from,
    To:val.To,
    phone:val.phone,
    discription:val.discription,
    dateAndTimeOfBooking:val.dateAndTimeOfBooking,
   }));
console.log(bookingDetails.map((val, index, array) =>val.type))
  /*Booking Details Table */
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: 'block',
          flexDirection: { md: 'row', xs: 'column' },
          boxShadow: 2,
          width: 'auto',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <h1>My Booking</h1>
        <div style={{ height: 200, width: '100%' }}>
          <DataGrid
            rows={Boockingrows}
            columns={Boockingcolumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        {/* AddeButton Diolog Box */}
        <Dialog
          open={delopen}
          onClose={DelhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={DelhandleClose}>Disagree</Button>
            <Button onClick={DelhandleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* AddeButton Diolog Box */}
      </Box>      
    </div>
  );
}
