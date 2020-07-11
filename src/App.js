import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  /** Works like 'componentDidMount' do React antigo */
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  })

  async function handleAddRepository() {
    const repositoryName = document.getElementById('title-repo');
    const repository = api.post('/repositories', {
       title: repositoryName.value,
       owner: 'Leonardo Reina',
       likes: 0 
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <input type="text" name="addRepository" id="title-repo" placeholder="Insert repository title" />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
