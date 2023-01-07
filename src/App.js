import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const[person, setPerson] = useState({firstname:'', lastname:'', email:''});
  const[people, setPeople] = useState([]);
  const[isFull, setIsFull] = useState(false);

  const refContainer = useRef(null);

  useEffect(()=>{
    document.title = `People(${people.length})`;
    if(people.length === 0){
      setIsFull(false);
    }
  },[people])

  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setPerson({...person, [name]: value})    
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(person.firstname && person.lastname && person.email){
    const newPerson = {...person, id: new Date().getTime().toString()}
    console.log(refContainer.current.value);
    setPeople([...people, newPerson]);
    setIsFull(true);
    setPerson({firstname:'', lastname:'', email:''});
    }  
  }

  const removeItem = (id)=>{
   let newPeople = people.filter((person)=>{
      return person.id !== id;
    })
    setPeople(newPeople);
  }

  const reset = ()=>{
    setIsFull(false);
    setPeople([]);
  }
  return (
    <>
    <div className="App">
      <form name='myform' onSubmit={handleSubmit}>
      <div className='form-control'>
      <label htmlFor='firstname'>First Name : </label>
        <input type="text" id="firstname" name="firstname" value={person.firstname} onChange={handleChange} />
      </div>
      <div className='form-control'>
      <label htmlFor='lastname'>Last Name : </label>
        <input type="text" id="lastname" name="lastname" value={person.lastname} onChange={handleChange} />
      </div>
      <div className='form-control email'>
      <label htmlFor='email'>Email : </label>
        <input type="email" id="email" name="email" value={person.email} ref={refContainer} onChange={handleChange} />
      </div>
      <button type='submit' className='btn'>Add person</button>
      </form>
    </div>

    <div className='list'>
      {people.map((person)=>{
        const{id, firstname, lastname, email} = person;
        return(
        <div className='obj' key={id}>
              <h4>{firstname}</h4>
              <p>{lastname}</p>
              <p>{email}</p>
              <button type='button' className='btn remove' onClick={() => removeItem(id)}>remove</button>
        </div>
        )

      })}

      {isFull && <button type='button' className='btn reset' onClick={reset}>reset</button>}

    </div>

    </>
  );
}

export default App;
