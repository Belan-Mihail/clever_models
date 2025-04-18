import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const token = false;
  
  useEffect(() => {
    if (!token) {
        navigate('/login')
    }
  }, [token])

  return <div>HomePage</div>;
};

export default HomePage;
