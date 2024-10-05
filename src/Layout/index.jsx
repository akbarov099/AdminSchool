import React from 'react';
import Login from './Login/Login';
import useTokenStore from './Login/store/useToken'; 
import Global from './Global';

export default function HomePage() {
  const token = useTokenStore((state) => state.token); 

  if (!token) {
    return <Login />;
  }

  return <Global />;
}
