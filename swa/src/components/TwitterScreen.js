import React, { useState } from "react";
import { Text, TextField, Spinner, SpinnerSize } from "@fluentui/react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { ActionButton } from "@fluentui/react/lib/Button";
import axios from "axios";

function TwitterScreen({ setForm }) {
  const [tweet, setTweet] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      var data = JSON.stringify({
        text: tweet,
      });
      await axios
        .post(`/api/twitter/tweets`, data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          setLoading(false);
          setSuccess(true);
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
      <div className="mb-5">
        {!success ? (
          <div>
            <div className="mb-3">
              <Text
                style={{
                  overflow: "hidden",
                }}
              >
                {" "}
                Your responses have been submitted. Would you like to post about
                your experience to Twitter and get featured?{" "}
              </Text>
            </div>
            <TextField
              placeholder="Enter Message Here"
              label="Tweet"
              multiline
              autoAdjustHeight
              required
              value={tweet}
              inputProps={{ maxLength: 20 }}
              onChange={(_, newValue) => {
                if (!newValue || newValue.length <= 280) {
                  setTweet(newValue || "");
                }
              }}
              className="mb-5"
            />
            {!loading ? (
              <ActionButton
                className="mb-5"
                onClick={(e) => handleSubmit(e)}
                iconProps={{ iconName: "Send" }}
              >
                Post Tweet!
              </ActionButton>
            ) : (
              <Spinner size={SpinnerSize.large} className="mb-5"></Spinner>
            )}
          </div>
        ) : (
          <div className="mb-3">
            <Text
              style={{
                overflow: "hidden",
              }}
            >
              {" "}
              Successfully posted tweet!{" "}
            </Text>
          </div>
        )}
        <TwitterTimelineEmbed
          className="mt-5"
          sourceType="profile"
          screenName="apimtokenstore"
          options={{ height: 400 }}
        />
        <div className="mb-5">
          <ActionButton
            onClick={(e) => {
              console.log(tweet);
              setForm(true);
            }}
            iconProps={{ iconName: "Back" }}
          >
            Submit another response
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default TwitterScreen;
