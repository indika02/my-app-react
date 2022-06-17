import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Rating, DialogContentText, InputLabel, Stack, Badge, Avatar, Box, styled, DialogTitle, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './styles/PersonalDetails.css';

import Axios from 'axios';

/*Item styled */
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: 'start',
}));
const myboxShadow = { boxShadow: 1 };
/*Item styled */

/*Rating values & labales const*/
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
/*Rating values & labales const*/

/*Avatar styles*/
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
/*Avatar styles*/




export default function PersonalDetails() {
  /*Rating hooks */
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  /*Rating hooks */

  /*Personal details */

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


 const [userDetails, setuserDetails] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/api/userAcc").then((response) => {
      setuserDetails(response.data)
    })
  },[]);
  return (
    <div>
      {userDetails.map((val, key) => {
        return (
          <div>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                boxShadow: 2,
                width: 'auto',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 1,
                m: 2,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar alt={val.Name} src="/static/images/avatar/1.jpg" />
              <h4 className='detaillist'>Name : {val.Name} </h4>
              <h4 className='detaillist'>Permanent Address : {val.address} </h4>
              <h4 className='detaillist'>Email : {val.email}</h4>
              <h4 className='detaillist'>Driver ID : {val.ID}</h4>
              <h4 className='detaillist'>Phone : {val.phone}</h4>
              <h4 className='detaillist'>Ratings :
                <Rating
                  name="hover-feedback"
                  value={val.ratings}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                  <font>{labels[value]}</font>
                )}
              </h4>
              <Button variant="outlined" onClick={handleClickOpen}>
                Change
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
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
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>

        );
      })}
    </div>
  );
}
