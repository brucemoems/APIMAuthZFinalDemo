import React, { useState } from "react";
import { Text, TextField } from "@fluentui/react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { ActionButton } from "@fluentui/react/lib/Button";

function TwitterScreen({ setForm }) {
  const [tweet, setTweet] = useState("");
  const handleSubmit = async (e) => {
    setForm(true);
  };

  return (
    <div
      style={{
        width: "85%",
      }}
    >
      <div className="mb-5">
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
          onChange={(_, newValue) => setTweet(newValue)}
          className="mb-5"
        />
        <ActionButton iconProps={{ iconName: "Send" }}>
          Post Tweet!
        </ActionButton>
      </div>
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
            handleSubmit(e);
          }}
          iconProps={{ iconName: "Back" }}
        >
          Submit another response
        </ActionButton>
      </div>
    </div>
  );
}

export default TwitterScreen;
