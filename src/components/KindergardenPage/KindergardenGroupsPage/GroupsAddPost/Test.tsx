import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export const App = () => {




    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState('');
    const [raw, setRaw] = useState('');
    const handleEditorChange = (state) => {
        setEditorState(state);
        setRaw(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const dirty = `<i>I love to do evil</i> <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    function sadasdsa() {
        return { __html: convertedContent };
    }

    return (
        <div className="App">
            <header className="App-header">
                Rich Text Editor Example
      </header>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>

            <div dangerouslySetInnerHTML={{__html: raw}}></div>
        </div>


    )
}
export default App;