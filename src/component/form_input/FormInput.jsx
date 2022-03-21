import React from "react";
import "./FormInput.css";
import { useState } from "react";
import { addUser } from "../action/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const FormInput = () => {
  const [value, Setvalue] = useState({
    id: "",
    title: "",
    body: ""
  });
  const dispatch = useDispatch();

  const handleFormInput = (e) => {
    Setvalue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const SubmitFormInput = (e) => {
    e.preventDefault();
    if (value !== "") {
      const newValue = {
        id: value.id,
        title: value.title,
        body: value.body
      };
      axios
        .post(`https://jsonplaceholder.typicode.com/posts`, newValue)
        .then((res) => {
          dispatch(addUser(res.data));
        });
    }
    Setvalue({
      id: "",
      title: "",
      body: ""
    });
  };

  return (
    <form onSubmit={SubmitFormInput}>
      <div>
        <label>ID</label>
        <input
          type="number"
          name="id"
          value={value.id}
          onChange={handleFormInput}
        />
      </div>

      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={handleFormInput}
        />
      </div>

      <div>
        <label>Body</label>
        <input
          type="text"
          name="body"
          value={value.body}
          onChange={handleFormInput}
        />
      </div>
      <button>ADD</button>
    </form>
  );
};

export default FormInput;
