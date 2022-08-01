import { useState } from "react";

export const useForm = (cb: any, initialState: any) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cb();
  };

  return {
      onChange,
      onSubmit,
      values
  }
};
