import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Searchs({ match }) {

  const [load, setLoad] = useState(false);
  const [notFound, setNotFound] = useState(false);

  if (!match.params.username) return <Redirect to='/' />
  if(!load)
    return <main><h1> Carregando... </h1></main>

  if(notFound)
    return <main><h1> Não foi encontrado um usuário de nome {match.params.username}... </h1></main>

  return (
    <main>
      <section>
        <header>
          <h1> Exibindo repositórios de {match.params.username} </h1>
        </header>
      </section>
    </main>
  )
}