import * as React from 'react';
import Routingtable from '../ChildComp/body/routingsTable'
import Bookingdetailstable from '../ChildComp/body/BookingDetailsTable'
export default function DataTable() {  
  return (
    <div>
      <Bookingdetailstable></Bookingdetailstable>
      <Routingtable></Routingtable>
    </div>
  );
}
