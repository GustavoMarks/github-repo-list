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
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [orderAlpha, setOrderAlpha] = useState(true);
  const [orderCreate, setOrderCreate] = useState(false);
  const [orderUpdate, setOrderUpdate] = useState(false);
  const [repos, setRepos] = useState([]);
  const [rendedRepos, setRenderedRepos] = useState([]);

  function setOrder(type) {
    let newArray = [];
    if (type === 'alpha') {
      newArray = rendedRepos.sort((a, b) => +(a.name > b.name) || -(a.name < b.name));
      setOrderAlpha(true);
      setOrderCreate(false);
      setOrderUpdate(false);

    } else if (type === 'create') {
      newArray = rendedRepos.sort((a, b) => +(a.created_at > b.created_at) || -(a.created_at < b.created_at));
      setOrderAlpha(false);
      setOrderCreate(true);
      setOrderUpdate(false);

    } else {
      newArray = rendedRepos.sort((a, b) => +(a.updated_at > b.updated_at) || -(a.updated_at < b.updated_at));
      setOrderAlpha(false);
      setOrderCreate(false);
      setOrderUpdate(true);

    }

    setRenderedRepos(newArray);
  }

  function handleFilter(e) {
    e.preventDefault();
    const newArray = repos.filter(function (repo) {
      return repo.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });

    setRenderedRepos(newArray);
    setQuery(filter);
  }

  function clearQuery() {
    setRenderedRepos(repos);
    setOrderAlpha(true);
    setOrderCreate(false);
    setOrderUpdate(false);
    setQuery('');
  }

  useEffect(() => {
    async function fetchRepos() {
      await api.get(`/github-repos/${match.params.username}`)
        .then(res => {
          setRepos(res.data);
          setRenderedRepos(res.data);

        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data.error.message === 'Request failed with status code 403') setLimited(true);
          else setNotFound(true);

        });

      setLoad(true);
    }
    if (repos.length === 0) fetchRepos();

    // eslint-disable-next-line
  }, [orderAlpha, orderCreate, orderUpdate, query]);

  if (!match.params.username) return <Redirect to='/' />
  if (!load)
    return <Loading />

  if (notFound)
    return (
      <main id='searchs'>
        <nav>
          <span>
            <img src={Logo} alt='GitHub' />
            <h1> <Link to='/'>Início</Link> / Pesquisa  </h1>
          </span>
          <span />
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
        <span>
          <img src={Logo} alt='GitHub' />
          <h1> <Link to='/'>Início</Link> / Pesquisa  </h1>
        </span>

        <form id="filters" onSubmit={handleFilter} >
          <input
            type='text'
            placeholder='Encontre um repositório...'
            minLength={1}
            value={filter}
            onChange={(e) => setFilter(e.target.value)} />
          <button type='button' onClick={() => setOrder('alpha')} > {orderAlpha ? <>&darr;</> : <>&uarr;</>} a-Z </button>
          <button type='button' onClick={() => setOrder('create')}> {orderCreate ? <>&darr;</> : <>&uarr;</>} data de criação </button>
          <button type='button' onClick={() => setOrder('update')}> {orderUpdate ? <>&darr;</> : <>&uarr;</>} último update </button>
        </form>
      </nav>

      <section className='container'>
        {
          query ? 
          <div id='query-tag'>
            <span>Filtrando resultados para <strong>{query}</strong></span>
            <span id='remove-tag' onClick={() => clearQuery()} > remover filtro <strong> x </strong></span>
          </div>
          : null
        }

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
                    repos.length > 0 ? <p> Total de {rendedRepos.length} resultado{rendedRepos.length > 1 ? 's' : null} </p> :
                      <p> Não foram encontrados repositórios... </p>
                  }
                </header>
                <RepoList data={rendedRepos} />
              </>
        }

      </section>
      <Footer />
    </main>
  )
}