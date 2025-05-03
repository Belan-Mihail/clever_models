import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Dashboard from '../components/Dashboard';

const HomePage = () => {
  const navigate = useNavigate();

  // const token = false;
  
  // useEffect(() => {
  //   if (!token) {
  //       navigate('/login')
  //   }
  // }, [token])

  return <>
   <Dashboard />
  </>;
};

export default HomePage;
