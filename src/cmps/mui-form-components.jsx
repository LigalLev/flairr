import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Button
} from "@material-ui/core";

export function CustomSelect({ children, form, field }) {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
        <Select
          name={name}
          value={value}
          onChange={e => {
            setFieldValue(name, e.target.value);
          }}
        >
          {children}
        </Select>
      )
    }
