import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );
  
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       if (response.status === 201) {
        return response.data.users_list;
       }
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} deleteUser={deleteUser} />
      <Form handleSubmit={updateList} />
    </div>
  )
  
async function updateList(person) { 
  const result = await makePostCall(person);
  if (result && result.status === 201)
       setCharacters([...characters, person] );
};

async function deleteUser(id) {
  try {
    const response = await axios.delete('http://localhost:8000/users:id');
    if (response.status === 204) {
      setCharacters(characters.filter(character => character.id !== id));
    }
  }
  catch (error) {
    console.log(error);
  }
}
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }
}

export default MyApp