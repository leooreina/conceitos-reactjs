import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./styles.css";

function App() {


  async function handleAddRepository() {
    // TODO
    axios.get('/repositories')
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
