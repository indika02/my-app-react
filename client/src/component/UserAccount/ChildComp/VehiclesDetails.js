import * as React from 'react';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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


export default function VehiclesDetails() {
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
            console.log(row);
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 180, editable: true },
        { field: 'type', headerName: 'Vehicle Type', width: 180, editable: true },
        { field: 'numOfPassengers', headerName: 'Number Of Seats', type: 'number',width: 180, editable: true },
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

    const [vehiDetails, setvehiDetails] = useState([]);
    useEffect(() => {
        Axios.post("http://localhost:3001/api/vehicleDetails").then((response) => {
            setvehiDetails(response.data)
        })
    },[]);    
        
    const rows = vehiDetails.map((val, index, array) => ({
        id: index,
        type: val.type,
        numOfPassengers: val.numOfPassengers,
      }));
    return (
        <Box
            sx={{
                flex: 'grow',
                display: 'block',
                height: 250,
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
            <h1>My Vehicles</h1>
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