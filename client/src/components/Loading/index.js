import React from 'react';
import Background from '../../assets/simple-codelines.svg';
import './style.css';

export default function Loading() {
  return <main id="load-content" style={{ backgroundImage: `url(${Background})` }}>
    <h1> carregando... </h1>
  </main>
}