import React from 'react';
import './style.css';

export default function RepoList({ data }) {
  function HandleColor(language){
    if(!language) return null
    if (language === 'HTML') return { backgroundColor: 'orange' }
    if (language === 'JavaScript') return { backgroundColor: '#FFFF66' }
    if (language === 'CSS') return { backgroundColor: 'purple' }
    return { backgroundColor: 'lightslategray' }
  }

  return (
    <ul id="repo-list">
      {
        data.map(repo => {
          return (
            <li key={repo.id}>
              <a href={repo.html_url} target='_blank' rel="noopener noreferrer"> {repo.name} </a>
              <p> {repo.description} </p>
              <strong> <span id="circle" style={HandleColor(repo.language)} /> {repo.language}</strong>
              <div>
                <time> criado em {new Date(repo.created_at).toLocaleDateString()} </time>
                <time> última atualização em {new Date(repo.updated_at).toLocaleDateString()} </time>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}