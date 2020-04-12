import React, { useState } from "react";

import { Field, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";

/**
 * Input Field React Component
 * @param Object fieldLabel :string, placeholder :string, fieldName :string
 * @returns  {ReactFC} Text field and with error message
 */
const InputField = ({ fieldLabel = "", placeholder = "", fieldName = "" }) => {
  return (
    <>
      <Field
        label={`${fieldLabel}*`}
        placeholder={placeholder}
        name={fieldName}
        type="input"
        as={TextField}
      />
      <ErrorMessage name={fieldName} />
    </>
  );
};

export default InputField;
