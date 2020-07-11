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
  }, [])

  async function handleAddRepository() {
    const repositoryTitle = document.getElementById('title-repo').value;
    const repository = await api.post('/repositories', {
       title: repositoryTitle,
       url: 'http://github.com/repository',
       techs: [
        "Javascript",
        "Frontend",
        "Backend"
       ],
       likes: 0 
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = await api.get('/repositories').then(repos => {
      return repos.data.findIndex(repo => repo.id === id);
    });

    await api.delete(`/repositories/${id}`).then(() => {
      repositories.splice(repositoryIndex, 1)
    });

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              <span>{repo.title}</span>
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
