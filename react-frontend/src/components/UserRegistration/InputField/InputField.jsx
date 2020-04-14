import React from "react";

import { Field, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";

/**
 * Input Field React Component
 * @param Object fieldLabel :string, placeholder :string, fieldName :string
 * @returns  {ReactFC} Text field and with error message
 */
const InputField = ({
  fieldLabel = "",
  placeholder = "",
  fieldName = "",
  type = "input",
}) => {
  return (
    <>
      <Field
        label={`${fieldLabel}*`}
        placeholder={placeholder}
        name={fieldName}
        type={type}
        as={TextField}
      />
      <div>
        <span>
          <ErrorMessage name={fieldName} />
        </span>
      </div>
    </>
  );
};

export default InputField;
