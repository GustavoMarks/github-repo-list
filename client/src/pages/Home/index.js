import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Background from '../../assets/simple-codelines.svg';
import Logo from '../../assets/GitHub-Mark-Light.png';
import Footer from '../../components/Footer';

import './style.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const history = useHistory();

  function submitUsername(e){
    e.preventDefault();
    history.push(`/search/${username}`);
  }

  return (
    <main id="home" style={{ backgroundImage: `url(${Background})`}}>
      <header className="App-header">
        <img src={Logo} alt='GitHub'/>
        <h1> GitHub Repo List </h1>
        <p> Liste repositórios de usuários do GitHub </p>
      </header>

      <form onSubmit={submitUsername}>
        <input
          type='text'
          placeholder='Digite um username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          title="insira uma combinação de letras e números, caracteres especiais não são aceitos"
          pattern="^[a-zA-Z0-9]+$" />

        <button type='submit'> Procurar </button>

      </form>
      <Footer />
    </main>
  )
}