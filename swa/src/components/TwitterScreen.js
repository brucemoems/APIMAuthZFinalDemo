import React, { useState, useEffect } from "react";
import { Text, TextField, Spinner, SpinnerSize } from "@fluentui/react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { ActionButton, DefaultButton } from "@fluentui/react/lib/Button";
import axios from "axios";

function TwitterScreen({ setPage }) {
  const [tweet, setTweet] = useState("");
  const [userId, setUserId] = useState("");
  const [connected, setConnected] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const makeConnection = async (e) => {
    axios
      .post(`/api/.auth/create/bmoe-twitter`)
      .then(() => {
        setConnected(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Initiate consent flow with redirect url.
          window.location.replace(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

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
            "connector-id": "bmoe-twitter",
            "connection-id": userId,
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

  useEffect(() => {
    axios.post("/.auth/me").then((userInfo) => {
      if (userInfo && userInfo.data.clientPrincipal != null) {
        setUserId(userInfo.data.clientPrincipal.userDetails);
      }
      axios.get(`/api/.token/status/bmoe-twitter`).then((response) => {
        if (response.data !== undefined && response.data === "CONNECTED") {
          setConnected(true);
        }
      });
    });
  });

  return (
    <div
      style={{
        width: "85%",
      }}
    >
      <div className="mb-5">
        {!success ? (
          <div>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="mb-3"
            >
              <Text
                style={{
                  overflow: "hidden",
                }}
                className="mb-3"
              >
                {" "}
                Welcome to Intern Hub. Would you like to post about your
                internship experience to Twitter and get featured?{" "}
              </Text>
              <Text> Step 1. Login using Microsoft </Text>
              {userId === "" ? (
                <DefaultButton
                  iconProps={{ iconName: "AuthenticatorApp" }}
                  href="/.auth/login/aad"
                  style={{ width: "30%" }}
                >
                  Login
                </DefaultButton>
              ) : (
                <Text style={{ fontWeight: "bold" }}> You are logged in</Text>
              )}
              <Text className="mt-3">
                {" "}
                Step 2. Connect your Twitter account{" "}
              </Text>
              {connected !== "" ? (
                <DefaultButton
                  style={{ width: "30%" }}
                  iconProps={{ iconName: "PlugConnected" }}
                  onClick={(e) => makeConnection(e)}
                >
                  Connect to Twitter
                </DefaultButton>
              ) : (
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  Your Twitter account is connected
                </Text>
              )}

              <Text className="mt-3">
                {" "}
                Step 3. Create a post that will automatically tag the DevDiv
                twitter account!{" "}
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
        <div
          className="mb-5"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ActionButton
            onClick={(e) => {
              console.log(tweet);
              setPage(2);
            }}
            iconProps={{ iconName: "Next" }}
          >
            Next
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default TwitterScreen;
