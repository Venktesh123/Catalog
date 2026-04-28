import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedItem } from './store/catalogSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import './styles/globals.css';

export default function App() {
  const selectedItem = useSelector(selectSelectedItem);

  return (
    <div>
      <Navbar />
      {selectedItem ? <ItemDetail /> : <Home />}
    </div>
  );
}
