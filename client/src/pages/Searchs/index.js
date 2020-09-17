import React, { useState, useEffect } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';

import Loading from '../../components/Loading';
import Logo from '../../assets/GitHub-Mark.png';
import RepoList from '../../components/RepoList';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

import api from '../../services';
import queryString from 'query-string';

import './style.css';

function Searchs({ match, location }) {

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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queryPage = queryString.parse(location.search).page;
  const username = match.params.username;

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

  async function fetchRepos(nextPage) {

    window.scrollTo(0, 0);

    let url = `/github-repos/${username}`;
    if (nextPage) url += `?page=${nextPage}`;

    try {

      const res = await api.get(url);
      setRepos(res.data);
      setRenderedRepos(res.data);

      setTotalPages(res.headers['x-last-page'] || 1);
      setPage(nextPage || 1);

    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data.error.message === 'Request failed with status code 403') setLimited(true);
      else setNotFound(true);

    }

    setLoad(true);
  }

  useEffect(() => {

    if (repos.length === 0) fetchRepos(queryPage);

    // eslint-disable-next-line
  }, [orderAlpha, orderCreate, orderUpdate, query, page]);

  if (!match.params.username) return <Redirect to='/' />
  if (!load)
    return <Loading />

  if (notFound)
    return (
      <main id='searchs'>
        <nav id='navbar'>
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
      <nav id='navbar'>
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
                    repos.length > 0 ? <p> Total de {rendedRepos.length} resultado{rendedRepos.length > 1 ? 's' : null}
                      {totalPages > 1 ? ` - (página ${page} de ${totalPages})` : null} </p> :
                      <p> Não foram encontrados repositórios... </p>
                  }
                </header>
                <RepoList data={rendedRepos} />
              </>
        }

        <Pagination totalPages={totalPages} actualPage={page} url={`/search/${match.params.username}`} onClick={fetchRepos} />

      </section>
      <Footer />
    </main>
  )
}

export default withRouter(Searchs);