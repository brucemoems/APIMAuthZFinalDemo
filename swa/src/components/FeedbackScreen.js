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
// import axios from "axios";

function FeedbackScreen({ setPage }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setPage(3);
  };

  return (
    <div
      style={{
        width: "85%",
      }}
    >
      <Text style={{ fontSize: FontSizes.medium }}>
        {" "}
        Please share your feedback about your intern experience. Your responses
        are completely anonymous and will be used to improve the experience for
        future interns.
      </Text>
      <div className="mt-4">
        <TextField
          placeholder="Enter feedback"
          label="Feedback"
          required
          className="mb-5"
          multiline
          autoAdjustHeight
          onChange={(_, newValue) => {
            setFeedback(newValue);
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
        <div className="mb-5" style={{ display: "flex", flexDirection: "row" }}>
          <ActionButton
            onClick={(e) => {
              console.log(feedback);
              console.log(setLoading);
              setPage(1);
            }}
            iconProps={{ iconName: "Back" }}
          >
            Back
          </ActionButton>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <ActionButton
              onClick={(e) => {
                setPage(3);
              }}
              iconProps={{ iconName: "Next" }}
            >
              Next
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackScreen;
