import React, { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');

  function submitUsername(e){
    e.preventDefault();
    console.log(username);

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
          onChange={(e) => setUsername(e.target.value)} />

        <button> Pesquisar </button>
      </form>
    </main>
  )
}