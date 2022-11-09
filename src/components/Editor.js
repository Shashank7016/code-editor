import React, {useState} from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt,faExpandAlt } from '@fortawesome/free-solid-svg-icons'
export default function Editor(props){
    const
    {
        language,
        displayName,
        value,
        onChange
    }=props
    const[open,setopen]=useState(true)
    function handleChange(editor,data,value){
        onChange(value)
    }   

    return(
        <div className={`code-container ${open ? '': 'collapsed'}`}>
            <div className="code-Title">
                {displayName}
                <button
                className="expcollbtn"
                 onClick={() => setopen(prevopen => !prevopen)}>
                    <FontAwesomeIcon icon={ open?faCompressAlt:faExpandAlt }/>
                </button>
            </div>
            <ControlledEditor
             onBeforeChange={handleChange}
             value={value}
             className="code-mirror-wrapper"
             options={{
                 lineWrapping:true,
                 lint:true,
                 mode:language,
                 theme:'material',
                 lineNumbers:true
             }}
             ></ControlledEditor>
        </div>
    )
}