import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function Pagination({ totalPages, actualPage, url, onClick }) {
  const [items, setItems] = useState([]);
  const history = useHistory();

  function handleRedirect(page) {
    history.push(url + `?page=${page}`);
    onClick(page);
  }

  useEffect(() => {

    let rederingItems = [];
    for (let i = 1; i <= totalPages; i++) {
      rederingItems.push(
      <button className={ i === actualPage ? 'nav-button-selected' : 'nav-button-default' } onClick={() => handleRedirect(i)} key={i} >
       {i}
       </button>)
    }

    setItems(rederingItems);
    // eslint-disable-next-line
  }, [actualPage])

  if (totalPages === 1) return null;
  return <nav id="pagination-nav"> {items} </nav>;
}