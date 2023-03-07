import logo from './logo.svg';

import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from "react";
import axios from 'axios'; // ajax를 사용하기 위한
import Cookies from 'universal-cookie'; 

function App() {

  const [movieContent, setMovieContent] = useState({
    title: '테스트 title',
    content: '테스트 content'
  })

  const [apiContent, setapiContent] = useState();

  const [formData, setformData] = useState({
      uuid: '1234',
      password: '1234',
  });

  const onClick = (e) => {
      setMovieContent({
        title: '짜란',
        content: '변경했습니다.'
      });
  }

  const apiCall = () => {
    const cookies = new Cookies().get('token');
      axios.get('http://localhost:8089/hi2',
      {
        headers: {
          "Authorization": 'Bearer ' + cookies
        }
      })
      .then(function(response) {
        setapiContent(response.data.hi2);
      })
      .catch(function(response){
        setapiContent(response);
      }) 
  }

  const apiLoginCall = () => {
    const crossOriginIsolated = {
      xhrFields: { "withCredentials": true}
    }
    axios.post('http://localhost:8089/auth'
        , formData
        , {
            headers: {
              "Contest-Type": "application/json"
            },
            xhrFields: {
              "withCredentials": true
            }
        })
    .then(function(response) {
      const cookies = new Cookies();
      cookies.set('token', response.data.token, {
        path: '/',
      });
    })
    .catch(function(response){
      console.log(response.data);
    }) 
}

  return (
    <div className='App'>
      <h1>npm start 리액트를 시시작작하하세세요요!!</h1>  

      <div className='box'>
        <span>{movieContent.title} {movieContent.content}</span>
        <br></br>
        <button onClick={onClick}>누르면 값이 변경 됩니다!</button>
      </div>

      <br></br>
      <div className='box'>
        <h1>axios 테스트 할꺼에요!</h1>
        <button onClick={apiCall}>API 호출 버튼</button>
        <h3>{apiContent}</h3>
      </div>

      <br></br>
      <div className='box'>
        <h1>axios 테스트 할꺼에요! 이번에는 로그인이에요!</h1>
        <button onClick={apiLoginCall}>API 호출 버튼</button>
      </div>

    </div>
  );
}

export default App;
