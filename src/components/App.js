import React,{useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html,sethtml]=useLocalStorage('html','')
  const [css,setcss]=useLocalStorage('css','')
  const [js,setjs]=useLocalStorage('js','')
  const [srcdoc,setsrcdoc]=useState('')

  useEffect(() => {
    const time=setTimeout(()=>{
      setsrcdoc(`
        <html>
         <body>${html}</body>
         <style>${css}</style>
         <script>${js}</script>
        </html>
      `)
    },250)
    return () => clearTimeout(time)
  },[html,css,js])
  
  return (<>
    <div className="panel panel-top">
      <Editor
      language="xml" 
      displayName="HTML" 
      value={html} 
      onChange={sethtml}
      />
      <Editor
      language="css" 
      displayName="CSS" 
      value={css} 
      onChange={setcss}
      />
      <Editor
      language="javascript" 
      displayName="JS" 
      value={js} 
      onChange={setjs}
      />
    </div>
    <div className="panel-bottom">   
      <h1>Output:</h1>
      <iframe 
      srcdoc={srcdoc}
      title="output" 
      sandbox="allow-scripts" 
      frameBorder="0" 
      width="100%"
      height="100%">
       </iframe>
    </div>

  </>

  )
}

export default App;
