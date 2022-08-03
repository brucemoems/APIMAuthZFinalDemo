import React, { useState } from "react";
import {
  TextField,
  DefaultButton,
  Spinner,
  SpinnerSize,
  ActionButton,
  Text,
  FontSizes,
  Rating,
  RatingSize,
} from "@fluentui/react";
// import axios from "axios";

function FeedbackScreen({ setPage }) {
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [improve, setImprove] = useState("");
  const [dev, setDev] = useState("");
  const [rating, setRating] = useState(0);
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
          placeholder="Engaging project, fun intern events, etc."
          label="What did you like about your internship?"
          className="mb-5"
          multiline
          autoAdjustHeight
          onChange={(_, newValue) => {
            setLike(newValue);
          }}
        />
        <TextField
          placeholder="Too much work, not enough socials, etc."
          label="What did you dislike about your internship?"
          className="mb-5"
          multiline
          autoAdjustHeight
          onChange={(_, newValue) => {
            setDislike(newValue);
          }}
        />
        <TextField
          placeholder="More networking events, clearer project expectations, etc."
          label="What could have been improved?"
          className="mb-5"
          multiline
          autoAdjustHeight
          onChange={(_, newValue) => {
            setImprove(newValue);
          }}
        />
        <TextField
          placeholder="Yes, because..."
          label="Would you return fulltime to DevDiv?"
          className="mb-5"
          multiline
          autoAdjustHeight
          onChange={(_, newValue) => {
            setDev(newValue);
          }}
        />
        Rate your internship experience
        <Rating
          max={10}
          size={RatingSize.Large}
          defaultRating={1}
          className="mb-5"
          onChange={(_, newValue) => {
            setRating(newValue);
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
              console.log(setLoading);
              console.log(like);
              console.log(dislike);
              console.log(improve);
              console.log(dev);
              console.log(rating);
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
              iconProps={{ iconName: "Forward" }}
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
