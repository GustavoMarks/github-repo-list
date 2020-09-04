import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Loading from '../../components/Loading';
import RepoList from '../../components/RepoList';
import Logo from '../../assets/GitHub-Mark.png';
import Footer from '../../components/Footer';

import api from '../../services';

import './style.css';

export default function Searchs({ match }) {

  const [load, setLoad] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [limited, setLimited] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      await api.get(`/github-repos/${match.params.username}`)
        .then(res => {
          setRepos(res.data);

        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data.error.message === 'Request failed with status code 403') setLimited(true);
          else setNotFound(true);

        });

      //setRepos(temp)
      setLoad(true);
    }

    fetchRepos();

    // eslint-disable-next-line
  }, []);

  if (!match.params.username) return <Redirect to='/' />
  if (!load)
    return <Loading />

  if (notFound)
    return (
      <main id='searchs'>
        <nav>
          <img src={Logo} alt='GitHub' />
          <h1> <Link to='/'>Início</Link> / Pesquisa  </h1>
        </nav>
        <section className='container'>
          <h1> Não foi encontrado um usuário de nome {match.params.username}... </h1>
        </section>
        <Footer />
      </main>
    )
  return (
    <main id='searchs'>
      <nav>
        <img src={Logo} alt='GitHub' />
        <h1> <Link to='/'>Início</Link> / Pesquisa  </h1>
      </nav>

      <section className='container'>
        {
          notFound ?
            <header><h1> Não foi encontrado um usuário de nome {match.params.username}... </h1></header> :
            limited ?
              <header>
                <h1> Limite de requisições atingido... :-( </h1>
                <p> Volte em 1 hora! </p>
              </header> :
              <>
                <header>
                  <h1> Exibindo repositórios de {match.params.username} </h1>
                  {
                    repos.length > 0 ? <p> Total de {repos.length} resultado{repos.length > 1 ? 's' : null} </p> :
                      <p> Este usuário ainda não tem repositórios públicos </p>
                  }
                </header>
                <RepoList data={repos} />
              </>
        }

      </section>
      <Footer />
    </main>
  )
}

// const temp = [
//   {
//     id: 172393692,
//     name: "Algoritmo-Organiza-Frete",
//     description: "Algoritmo para organização ótima de itens em caixa para frete.",
//     html_url: "https://github.com/GustavoMarks/Algoritmo-Organiza-Frete",
//     language: "JavaScript",
//     created_at: "2020-03-14T01:31:42Z",
//     updated_at: "2020-03-21T02:49:55Z",
//   }
// ]