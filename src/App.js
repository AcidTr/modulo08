import React, { useState, useEffect } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

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

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar Tecnologia
      </button>
    </>
  );
}

export default App;
