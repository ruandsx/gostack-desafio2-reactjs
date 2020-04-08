import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const params = {
      title: `Desafio Conceitos ReactJS - GoStack - ${Date.now()}`,
      url: "https://github.com/ruandsx/gostack-desafio2-reactjs",
      techs: ["React", "Node.js"],
    };
    api.post("repositories", params).then((res) => {
      setRepositories([...repositories, res.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((res) => {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    });
  }

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
