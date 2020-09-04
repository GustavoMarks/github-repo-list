import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const [username, setUsername] = useState('');
  const history = useHistory();

  function submitUsername(e){
    e.preventDefault();
    history.push(`/search/${username}`);
  }

  return (
    <main>
      <header className="App-header">
        <h1> Liste repositórios de usuários o GitHub </h1>
      </header>

      <form onSubmit={submitUsername}>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          title="insira uma combinação de letras e números, caracteres especiais não são aceitos"
          pattern="^[a-zA-Z0-9]+$" />

        <button> Pesquisar </button>
      </form>
    </main>
  )
}