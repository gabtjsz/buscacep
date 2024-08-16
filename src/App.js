//BLOCO DE IMPORTAÇÃO
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

function App (){
  //atribui um nome para uma constante e indica o valor da sua variável
  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({});

  //ASYNC FUNCTION: função assícrona para trazer informações ao api
  async function handleSearch(){
    //IF (INPUT === ''): verificando se o usuário escreveu o cep, caso nao, emite um alerta pedindo para fornecer um cep
    if(input === ''){
      alert ("Preenha algum CEP")
      return;
    }
    //TRY: executa a ação desejada, consullta api e armazena a informação 
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")

    //CATCH: sempre que a aplicação 'try' não der como esperado, emite um alerta
    }catch{
      alert("Erro ao buscar CEP")
      setInput("")
    }
  }

  //RETURN: retorna a aquisição
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

  <div className="containerInput">
      <input
      type="text"
      placeholder="Digite seu CEP"
      //value:  valor do INPUT
      value={input}

    //ON CHANGE: captar qualquer tecla que estiver na variavel input
    //SET INPUT: allter o valor da variavel forneecida pelo usuário 
      onChange={(e) => setInput(e.target.value)} 
      />

      <button className="buttonSearch" onClick= {handleSearch}>
      
        <FiSearch size={25} color="FFF"/>
      </button> 
    </div>
    {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>CEP; {cep.cep}</h2>
        <span>Rua: {cep.longradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localicade} - {cep.uf}</span>
      </main>
    )}  

    </div>
  );
}

export default App;


//Object.keys(cep).length > 0 &&: se CEP pr maior que 0, será renderizado
//ONCLICK; quando o usuário apertar o botão, vai chamar a função HANDLESEARCH