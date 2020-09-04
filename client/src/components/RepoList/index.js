import React from 'react';

export default function RepoList({ data }) {
  return (
    <ul>
      {
        data.map(repo => {
          return (
            <li key={repo.id}>
              <a href={repo.html_url} target='_blank' rel="noopener noreferrer"> {repo.name} </a>
              <p> {repo.description} </p>
              <strong>{repo.language}</strong>
              <span>
                <p> criado em: {new Date(repo.created_at).toLocaleDateString()} </p>
                <p> última atualização: {new Date(repo.updated_at).toLocaleDateString()} </p>
              </span>
            </li>
          )
        })
      }
    </ul>
  )
}