import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const now = new Date().toJSON().slice(0, 10);
  const [ date, setDate ] = useState(now);
  const [ weather, setWeather ] = useState(Weather.Sunny);
  const [ visibility, setVisibility ] = useState(Visibility.Great);
  const [ comment, setComment ] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  interface WeatherOption{
    value: Weather;
    label: string;
  }

  const weatherOptions: WeatherOption[] = Object.values(Weather).map(w => ({
    value: w, label: w.toString()
  }));

  // extending the HTMLElement type with generics
  // type HTMLElementEvent<T extends HTMLElement> = Event & {
  //   target: T;
  // }

  // const onWeatherChange = (e: HTMLElementEvent<HTMLButtonElement>) => {
  // const onWeatherChange = (e: React.SyntheticEvent) => {
  // const onWeatherChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
  
  interface SyntheticEvent<T> extends React.SyntheticEvent {
    target: EventTarget & T;
  }
    
  const onWeatherChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if( typeof e.target.value === "string") {
      const value = e.target.value;
      const weatherIns = Object.values(Weather).find(w => w.toString() === value);
      if(weatherIns) setWeather(weatherIns);
    }
  };

  interface VisibilityOption{
    value: Visibility;
    label: string;
  }
  
  const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
  }));
  
  //https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/

    // // type narrow:
    // const onVisibilityChange = (e: Event) => {
    //   const target = e.target as HTMLButtonElement;
    
    // Another way is to define the type of the target object in the callback
    // function using the & type intersection operator:
    
  const onVisibilityChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if ( typeof e.target.value === "string") {
      const value = e.target.value;
      const visibilityIns = Object.values(Visibility).find(v => v.toString() === value);
      if (visibilityIns) {
        setVisibility(visibilityIns);
      }
    }
  };

  interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary= {date, weather, visibility, comment}
    createDiary(newDiary)
      .then(data =>{
        setDiaries(diaries.concat(data));
        setDate(now);
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);
        setComment('');
        setMessage(''); //mesage: hide by correct request
      })
      .catch(e => {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>) {
          if(e.response){
            console.log('status:', e.response.status)
            console.error('data:', e.response.data);
            setMessage(e.response.data) 
            // setTimeout(() => { //message: hide by timeout
            //   setMessage('');
            // }, 5000);
          }
          
        } else {
          console.error(e);
        }
      })

  }

  return (
    <div>
      <h2>Add new diary:</h2>
      {message && <p style={{ color:'red' }}>{message}</p>}
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">Start date:</label>
        <input type="date" id="date" name="trip-start" value={date} min={now} max="2024-12-31" onChange={(e)=>setDate(e.target.value)}/>
          <p>Weather:</p>
          {weatherOptions.map((o) => 
            <div key ={o.value}>
              <input type="radio" id={o.value} name="weather" value={o.value} onChange={onWeatherChange} checked={o.value === weather}/> 
              <label htmlFor={o.value}>{o.value}</label>
            </div>
          )}
          <p>Visibility:</p>
          {visibilityOptions.map((o) => 
            <div key ={o.value}>
              <input type="radio" id={o.value} name="visibility" value={o.value} onChange={onVisibilityChange} checked={o.value === visibility}/> 
              <label htmlFor={o.value}>{o.value}</label>
            </div>
          )}
        comment<input value={comment} onChange={(e)=>setComment(e.target.value)} /> <br />
        <button type="submit">save</button>
      </form>
      <h2> Diary entries</h2>
        {diaries.map(d =>
          <div key = {d.id}>
            <h3>{d.date}</h3>
            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
          </div>
        )}
    </div>
  )
}
export default App
