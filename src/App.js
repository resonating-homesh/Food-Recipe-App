import './App.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Spinner from './Spinner';

function App() {
  const [loading, setLoading] = useState(false); //determines whether the page is loading 
  const [query, setQuery] = useState(""); //stores the data put in by user to search
  const [recipes, setRecipes] = useState([]); //stores in the data recieved from axios request
  const [pre, setPre] = useState(true);//helps in determining class 
  const [test, setTest] = useState(false); //helps inn determining class
  const [length, setLength] = useState(20); //stores the length of the recipes to be received
  let result; //stores the response from axios request


  const apiKey = process.env.REACT_APP_APIKEY; //stores api key

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: length - 20,
      size: 20,
      q: query
    },
    headers: {
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      'X-RapidAPI-Key': apiKey,
    }
  }
//function for axios request
  async function getRecipes() {
    setPre(false); 
    setLoading(true);
    await axios.request(options).then(function (response) {
      result = response;
    }).catch(function (error) {
      alert(error + "! Try Reloading the app !")
    })
    console.log(result.data);
    setRecipes(result.data.results);
    //if else statement below helps us to determine the classes for the rendered element
    if (result.data.results.length === 0) {
      setTest(true);
      setPre(true);
    }
    else {
      setTest(false);
      setPre(false);
    }
    setLoading(false);
  }

  //it will trigger the axios request once we click search btn
  const submit = (e) => {
    e.preventDefault();
    setLength(20);
    getRecipes();
  }

  //determines the class of the rendered div
  function checkClass2(loading, pre) {
    if (loading === false) {
      if (pre === true) {
        return "none";
      }
      else {
        return "btnSection"
      }
    }
    else {
      return "none";
    }
  }

  //works when triggered by clicking next button
  function handlePrevClick() {
    if (length > 20) {
      setLength(length - 20);
      console.log(length);
    }
  }

  //works when triggered by clicking prev button
  function handleNextClick() {
    setLength(length + 20);
    console.log(length);
  }

//whenever length's state is changed it gets triggered
  useEffect(() => {
    getRecipes();
    console.log("effect");
  }, [length])

  return (
    <div className="app">
      <div className='header'>
        <h1 className='title' >Get Your Recipe !</h1>
        <form className='form' onSubmit={submit}>
          <input className='searchInput' type='text' placeholder='Happy Cravings!' value={query} onChange={(e) => setQuery(e.target.value)} />
          <input className='btn' type="submit" value="Search" />
        </form>
      </div>
      <div className={loading ? "loader" : "grid"}>
        {loading ? <Spinner /> : recipes.map((e) => {
          return <Grid e={e} />;
        })}
      </div>
      <div className={checkClass2(loading, pre)}>
        <button type='button' className='Btn' onClick={handlePrevClick} >Previous</button>
        <h2 style={{ color: 'white' }} > Page {length / 20} </h2>
        <button type='button' className='Btn' onClick={handleNextClick} >Next</button>
      </div>
      <div className={test ? "null" : "none"}>
        <p className={loading ? "nullText" : "none"}> Searching... </p>
        <p className={loading ? "none" : "nullText"}>Sorry! No Results !</p>
      </div>
    </div>
  );
}
export default App;