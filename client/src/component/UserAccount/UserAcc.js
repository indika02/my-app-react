import React from 'react'
import PersonalDetails from "./ChildComp/PersonalDetails";
import RoutingTimeTable from "./ChildComp/RoutingTimeTable";
import VehiclesDetails from "./ChildComp/VehiclesDetails";
import Header from "../home/ChildComp/header";

import {Navigate} from "react-router-dom";
export default function UserAcc(props) {
  const Auth = props.Auth;
  if (!Auth){
    return (
     <Navigate to="/login" />
    )}
  return (
    <div>
        <Header></Header>
        <PersonalDetails></PersonalDetails>
        <VehiclesDetails></VehiclesDetails>
        <RoutingTimeTable></RoutingTimeTable>
    </div>
  )
}
