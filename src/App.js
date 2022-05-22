import './App.css';
import { Axios } from 'axios';
import axios from "axios";
import { useState } from 'react';
import Grid from './Grid';
import Spinner from './Spinner';

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [pre, setPre] = useState(true);
  const [test, setTest] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {from: '0',
    size: '20',
    q: query},
    headers: {
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      'X-RapidAPI-Key': '6a70f37b5dmsh66ea700b1675d79p13405djsn02ef84b46652'
    }
  }
  
  // axios.request(options).then(function (response) {
  //   console.log(response);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  async function getRecipes(){
    setPre(false);
    setLoading(true);
    const result = await axios.request(options);
    console.log(result.data);
    setRecipes(result.data.results); 
    if (result.data.results.length === 0)
    {
      setTest(true);
      console.log(recipes);
    }
    else
    {
      setTest(false);
      console.log(recipes);
    }
    setLoading(false);
  }

  const submit = (e) =>
  {
    e.preventDefault();
    getRecipes();
  }

 function checkClass (loading, pre)
 {
    if (loading  == false)
    {
      if (pre == true)
      {
        return "";
      }
      else{
        return "grid"
      }
    }
    else{
      return "loader";
    }
  }


  return (
    <div className="app">
    <div className='header'>
      <h1 className='title' >Get Your Recipe !</h1>
      <form className='form' onSubmit={submit}>
    <input className='searchInput' type='text' placeholder='Happy Cravings!' value = {query} onChange={(e)=> setQuery(e.target.value)}/>
    <input className='btn' type="submit" value="Search"/>
      </form>
      </div>
      <div className={checkClass(loading, pre)}>
        {loading ? <Spinner/> : recipes.map((e)=> {
          return <Grid e={e}/>;
        })}
      </div>
      <div className={pre ? "null" : "none"}>
      <div className={test ? "none" : ""}>
        <p className='nullText'>Looking for a new recipe?</p>
        <p className='nullText'>Search the one who satisfies your cravings and ENJOY !</p>
      </div>
        <img className='nullImage' src='2.jpeg'></img>
      </div>
      <div className={test ? "null" : "none"}>
      <p className={loading ? "nullText" : "none"}> Searching... </p>
      <p className={loading ? "none" : "nullText"}>Sorry! No Results !</p>
      </div>
    </div>
  );
}

export default App;


//no results found ka kya kre

