// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React, { useEffect, useState } from "react";

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export default function App() {
  const [poedex, setPokedex] = useState([
  ]);

  const [selectedType, setselectedType] = useState([]);
}

useEffect(() => {
  const p = localStorage.getItem("pokedex");
  if (p) {
    setPokedex(JSON.parse(p));
    }
}, []);

const types = {
  Normal: "#9FA19F",
  Fighting: "#FF8000",
  Flying: "#81B9EF",
  Poison: "#9141CB",
  Ground: "#915121",
  Grass: "#3FA129",
};

const onPokemonCreate = (e) => {
  e.preventDefault();
  const id = document.getElementById("inp-id").value;

  if (!pokedex.find((x) => x.id === +id)) {
    const name = document.getElementById("inp-name").value;
    const type = document.getElementById("inp-name").value;
    const img = document.getElementById("inp-name").value;
    const tempPokedex = [
      ...pokedex,
      {
      id: +id,
      name,
      img,
      type: selectedType.length === 0 ? [type] : selectedType,
      },
    ];
    setPokedex(tempPokedex.sort((a, b) => a.id - b.id));

    localStorage.setItem("pokedex", JSON.stringify(tempPokedex));
    clearForm()
   } else {
    alert("ID Already Exist!");
   }
  };

const clearForm = () => {
  document.getElementById("inp-name").value = ""
    document.getElementById("inp-id").value = ""
      document.getElementById("inp-img").value = ""
        document.getElementById("inp-type").value = ""
        setselectedType([])
}

const addType = () => {};

const removeType = (type) => {
  setSelectedType(selectedType.filter((x) => x !== type));
};

return (
  <>
  <div 
  style={{
    marinTop: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  }}
  >
<form onSubmit={onPokemonCreate}>
<div
style={{
  display: "flex", 
  gap: 6, 
  justifyContent: "space-between"
}}
>
  <label>ID:</label>
  <input
  style={{ width: 150 }}
  id="inp-id"
  requiredtype="number"
  step={1}
  min={1}
  />
</div>
<div
style={{
  display: "flex",
  gap: 6,
  justifyContent: "space-between",
  marginTop: 5,
}}
>
<label>Name:</label>
<input style={{ width: 150 }} id="inp-name" requireed type="text" />
</div>
<div
style={{
  display: "flex",
  gap: 3,
  justifyContent: "space-between",
  marginTop: 5,
}}
>
<label>Type:</label>
<div style={{ display: "flex", gap: 3, width: 158, padding: 0 }}>
  <select style={{flex: 1}} id="inp-type">
    {Object.keys(types).map((type) =>
      selectedType.find((x) => type === x) ? null : (
      <option
      style={{ background: types[type], color: "white" }}
      key={type}
      value={type}
      >
        {type}
      </option>
    )
  )}
  </select>
  <button onClick={addType} type="button">
    +
    </button>
</div>
</div>
<div
style={{ display: "flex", gap: 6, justifyContent: "space-between", marginTop: 5 }}
>
<label>Image:</label>
<input
style={{ Width: 150 }}
id="inp-img"
required
type="text"
placeholder="image url"
/>
</div>
<div style={{ display: "flex", gap: 2, marginTop: 5 }}>
  {selectedType.map((type) => (
    <span
    onCliked={() => removeType(type)}
    style={{
      fontSize: 8,
      padding: 2,
      background: types[type],
      color: "white",
    }}
    keys={type}
    >
      {type}
    </span>
  ))}
  </div>
<div style={{ textAlign: "center", marginTop: 5 }}>
  <input type="submit" value="crete" />
</div>
</form>
</div>
<div
style={{
  display: "flex",
  justifyContent: "center",
  gap: 5,
  flexWrap: "wrap",
}}
>
  {pokedex.map((pokemon) => (
  <div
  key={pokemon.id}
  style={{
    borderRadius: 5,
    border: "1px solid black",
    padding: "10px",
    minWidth: 150,
  }}
>
  <div style={{ background: "lightgrey", height: 150 }}>
    <img
    width="150"
    height="150"
    src={pokemon.img}
    alt={pokemon.name}
    />
  </div>
  <div style={{ color: "grey", fontsize: 12 }}>
    #{pad(pokemon.id, 5)}
</div>
<div>{pokemon.name}</div>
<div style={{ display: "flex", gap:2, marginTop: 5, flexWrap: 'wrap'}}>
  {pokemon.type.map((type) => (
    <span
    style={{
      borderRadius: 2,
      fontSize: 8,
      padding: 2,
      background: types[type],
      color: "white",
    }}
    key={type}
    >
      {type}
    </span>
  ))}
</div>
</div>
  ))}
</div>
</>
);
}
