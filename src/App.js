import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');
  /*
    useCallcak evita que uma função seja montada do zero sempre que o componente
    é alterado. Se esquecer de preencher o array de dependências, o eslint faz
    o preenchimento
  */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  /*
    Com o array vazio, substitui o componentDidMount, pois como não tem nenhum estado
    sendo observado, ele roda somente uma vez.
  */
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
    /* retornar uma função é a forma de fazer este useEffect ser executado quando
    o componente deixa de ser montado(componentWillUnmount)
    */
    // return () => {};
  }, []);

  /*
    Estado tech esta sendo observado e quando tiver alguma alteração, useEffect
    executa o escopo da função.(componentDidUpdate)
  */
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  /* useMemo permite que algo seja chamado somente quando houver
  alteração naquele algo
  */
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar Tecnologia
      </button>
    </>
  );
}

export default App;
