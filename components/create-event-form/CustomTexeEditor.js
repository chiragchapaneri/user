import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Field, useField, useFormikContext } from "formik";

const CustomTexeEditor = ({ setValues, ...props }) => {
  const editorRef = useRef(null);
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const log = () => {
    if (editorRef.current) {
    }
  };
  const handleSelect = (val) => {
    setFieldValue(props.name, val);
  };
  return (
    <>
      <Field name={props.name}>
        {({ field, meta }) => {
          return (
            <div className={`${props.componentstyle}`}>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={field.value}
                init={{
                  height: props.height,
                  menubar: false,
                  statusbar: false,
                  branding: false,
                  plugins: "link image code",
                  toolbar:
                    "bold italic underline link | h1 h2 h3 | Superscript Subscript |alignleft aligncenter alignright",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleSelect}
                textareaName={props.name}
              />
            </div>
          );
        }}
      </Field>
    </>
  );
};
export default CustomTexeEditor;
