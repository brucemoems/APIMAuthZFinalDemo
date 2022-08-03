import React, { useState } from "react";
import {
  TextField,
  DefaultButton,
  Spinner,
  SpinnerSize,
  ActionButton,
  Text,
  FontSizes,
} from "@fluentui/react";
import axios from "axios";

function FormScreen({ setPage }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      var data = JSON.stringify({
        FirstName: first,
        LastName: last,
        Company: team,
        Title: role,
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
          setLoading(false);
          setPage(3);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: "85%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text className="mb-3" style={{ fontSize: FontSizes.medium }}>
          {" "}
          Fill out this form if you would like to be added to the DevDiv former
          intern mailing list!{" "}
        </Text>
        <Text style={{ fontSize: FontSizes.medium }}>
          {" "}
          Note: Your contact info and feedback will be used for Microsoft
          internal purposes only{" "}
        </Text>
      </div>
      <Text style={{ fontSize: FontSizes.medium }}> </Text>
      <div className="mt-4">
        <TextField
          placeholder="John"
          label="First Name"
          required
          onChange={(_, newValue) => setFirst(newValue)}
          className="mb-5"
        />
        <TextField
          placeholder="Doe"
          label="Last Name"
          required
          className="mb-5"
          onChange={(_, newValue) => {
            setLast(newValue);
          }}
        />
        <TextField
          placeholder="johndoe@outlook.com"
          label="Email"
          required
          className="mb-5"
          onChange={(_, newValue) => {
            setEmail(newValue);
          }}
        />
        <TextField
          placeholder="SWE"
          label="What was your role?"
          className="mb-5"
          onChange={(_, newValue) => {
            setRole(newValue);
          }}
        />
        <TextField
          placeholder="APIM"
          label="What team did you intern on?"
          className="mb-5"
          onChange={(_, newValue) => {
            setTeam(newValue);
          }}
        />

        {!loading ? (
          <DefaultButton
            className="mb-5"
            onClick={(e) => handleSubmit(e)}
            variant="primary"
          >
            Submit
          </DefaultButton>
        ) : (
          <Spinner size={SpinnerSize.large} className="mb-5"></Spinner>
        )}
        <div className="mb-5">
          <ActionButton
            onClick={(e) => {
              setPage(2);
            }}
            iconProps={{ iconName: "Back" }}
          >
            Back
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default FormScreen;
