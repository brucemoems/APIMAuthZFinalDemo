import React, { useState } from "react";
import {
  TextField,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Checkbox,
} from "@fluentui/react";
import axios from "axios";

function FormScreen({ setForm }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      var data = JSON.stringify({
        FirstName: first,
        LastName: last,
        Company: team,
        Phone: phone,
        Email: email,
      });
      await axios
        .post(`/api/salesforce/services/data/v55.0/sobjects/Lead`, data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          console.log(feedback);
          setLoading(false);
          setForm(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <TextField
        placeholder="John"
        label="1. First Name"
        required
        onChange={(_, newValue) => setFirst(newValue)}
        className="mb-5"
      />
      <TextField
        placeholder="Doe"
        label="2. Last Name"
        required
        className="mb-5"
        onChange={(_, newValue) => {
          setLast(newValue);
        }}
      />
      <TextField
        placeholder="xxx-xxx-xxxx"
        label="3. Phone Number"
        required
        className="mb-5"
        onChange={(_, newValue) => {
          setPhone(newValue);
        }}
      />
      <TextField
        placeholder="john@outlook.com"
        label="4. Email"
        required
        className="mb-5"
        onChange={(_, newValue) => {
          setEmail(newValue);
        }}
      />
      <TextField
        placeholder="What team did you intern on?"
        label="5. Team"
        required
        className="mb-5"
        onChange={(_, newValue) => {
          setTeam(newValue);
        }}
      />
      <TextField
        placeholder="Enter Feedback"
        label="6. Feedback"
        required
        multiline
        autoAdjustHeight
        className="mb-5"
        onChange={(_, newValue) => {
          setFeedback(newValue);
        }}
      />
      <Checkbox
        label="Send me an email copy of my responses"
        className="mb-5"
      />
      {!loading ? (
        <PrimaryButton
          className="mb-5"
          onClick={(e) => handleSubmit(e)}
          variant="primary"
        >
          Submit
        </PrimaryButton>
      ) : (
        <Spinner size={SpinnerSize.large} className="mb-5"></Spinner>
      )}
    </div>
  );
}

export default FormScreen;
