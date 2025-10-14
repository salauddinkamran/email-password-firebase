import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const Root = () => {
  return (
    <div className='w-6xl mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;