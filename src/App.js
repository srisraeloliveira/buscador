import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { TbMapSearch } from "react-icons/tb";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  useEffect(() => {
    // Coloca o cursor no campo input CEP
    document.getElementById('searchInputCEP').focus();
  });

  function handleKeyUp(event) {
    // debugger
    let pattern = /[0-9]/g
    if (!pattern.test(event.key)) {
      let inputCep = document.getElementById('searchInputCEP')
      inputCep.value = inputCep.value.replace(/\D/g, '');
    }
    if (input.length === 8 || event.key === 'Enter') {
      handleSearch();
    }
  }
  async function handleSearch() {
    try {
      //debugger
      if (input === "") {
        throw new Error("Preencha algum CEP");
      }

      const response = await api.get(`${input}/json`);

      if (response && !response.data.erro) {
        setCep(response.data);
        setInput("")
        toast.success('Encontramos seu CEP 🎉', {
          icon: '🎉',
        });;
      }
      else {
        throw new Error("Não foi possível consultar o CEP");
      }
    } catch (e) {
      toast.error(e.message);
      setInput("");
    }
  }
  return (
    <div className="general">
      <h1 className="title"> Buscador CEP</h1>

      <div><Toaster /></div>

      <div className="input">
        <input
          id="searchInputCEP"
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyUp}
          onKeyUp={handleKeyUp}
          maxLength="8"
          min="0"
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