import { useState } from "react";
import { TbMapSearch } from "react-icons/tb";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //06018080/json/

    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert("ops, CEP não existente");
      setInput("");
    }
  }
  return (
    <div className="general">
      <h1 className="title"> Buscador CEP</h1>

      <div className="input">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <TbMapSearch size={25} color="#FFFF00" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP:{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} / {cep.uf}</span> 
        </main>
      )}
    </div>
  );
}

export default App;
