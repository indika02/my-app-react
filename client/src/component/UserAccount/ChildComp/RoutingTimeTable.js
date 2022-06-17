import * as React from 'react';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import { Box, MenuItem, InputLabel, Select } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';



import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';

import Axios from 'axios';

function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, 'name');
    });
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};


export default function RoutingTimeTable() {

  const [travelDetails, settravelDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/TravelDetails").then((response) => {
      settravelDetails(response.data)
    })
  }, []);

  const rows = travelDetails.map((val, index, array) => ({
    id: index,
    Vehicle:val.type,
    from: val.From,
    to: val.To,
    Date: val.date,
    discription: val.discription,
    gMapID: val.gMapID,
  }));


  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'edit');  
  };

  const handleSaveClick = (id) => async (event) => {
    event.stopPropagation();
    // Wait for the validation to run
    const isValid = await apiRef.current.commitRowChange(id);
    if (isValid) {
      apiRef.current.setRowMode(id, 'view');
      const row = apiRef.current.getRow(id);
      apiRef.current.updateRows([{ ...row, isNew: false }]);
    }
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: 'delete' }]);    
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    }
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectvahicleDetails, setselectvahicleDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/selectvahicle").then((response) => {
      setselectvahicleDetails(response.data)
    })
  }, []);

  const columns = [
    { field: 'ID', headerName: 'ID', width: 130 },
    {
      field: 'Vehicle',
      headerName: 'Vehicle',
      width: 130,  
      type: 'singleSelect',
      valueOptions: selectvahicleDetails.map((val, index, array) => (val.type)),
      editable: true
    },
    { field: 'from', headerName: 'From', width: 170, editable: true, },
    {
      field: 'to',
      headerName: 'To',
      type: 'String',
      width: 170,
      editable: true,
    },
    {
      field: 'Date',
      headerName: 'Date And Time',
      type: 'dateTime',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      editable: true,
    },
    {
      field: 'discription',
      headerName: 'Discription',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable: true,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'gMapID',
      headerName: 'Google Map ID',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      editable: true,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {       
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,            
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"            
          />,
        ];
      },
    },
  ]; 
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        height: 500,
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
      <h1>Time Table</h1>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </Box>
  );
}