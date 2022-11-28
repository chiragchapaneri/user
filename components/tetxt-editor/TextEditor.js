import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CustomTexeEditor = (props) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      props.changeData(editorRef.current.getContent());
    }
  };
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue=""
      onChange={log}
      init={{
        height: props.height,
        width: props.width,
        menubar: false,
        statusbar: false,
        branding: false,
        plugins: 'link image code',
        toolbar:
          'bold italic underline link | h1 h2 h3 | Superscript Subscript |alignleft aligncenter alignright',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default CustomTexeEditor;
