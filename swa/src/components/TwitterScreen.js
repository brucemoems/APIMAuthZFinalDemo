import React, { useState, useEffect } from "react";
import { Text, TextField, Spinner, SpinnerSize } from "@fluentui/react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { ActionButton, DefaultButton } from "@fluentui/react/lib/Button";
import axios from "axios";

function LoginDisplay({ userId, alias }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text> Step 1. Login using Microsoft </Text>
      {userId === "" ? (
        <DefaultButton
          className="mt-2"
          iconProps={{ iconName: "AuthenticatorApp" }}
          href="/.auth/login/aad"
          style={{ width: "20%" }}
        >
          Login
        </DefaultButton>
      ) : (
        <div
          className="mt-2"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            You are logged in as {alias}
          </Text>
          <DefaultButton
            className="mt-2"
            iconProps={{ iconName: "SignOut" }}
            href="/.auth/logout"
            style={{ width: "20%" }}
          >
            Logout
          </DefaultButton>
        </div>
      )}
    </div>
  );
}

function TwitterConnect({ userId, connected, makeConnection, endConnection }) {
  if (userId !== "") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text className="mt-3"> Step 2. Connect your Twitter account </Text>
        {!connected ? (
          <DefaultButton
            className="mt-2"
            style={{ width: "25%" }}
            iconProps={{ iconName: "PlugConnected" }}
            onClick={(e) => makeConnection(e)}
          >
            Connect to Twitter
          </DefaultButton>
        ) : (
          <div
            className="mt-2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              Your Twitter account is connected
            </Text>
            <DefaultButton
              className="mt-2 mb-2"
              iconProps={{ iconName: "PlugDisconnected" }}
              onClick={(e) => endConnection(e)}
              style={{ width: "20%" }}
            >
              Disconnect
            </DefaultButton>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

function TweetDisplay({ connected, tweet, setTweet, loading, handleSubmit }) {
  if (connected) {
    return (
      <div className="mt-2">
        <Text>
          {" "}
          Step 3. Create a post that will automatically tag the PSI interns
          twitter account!{" "}
        </Text>
        <TextField
          placeholder="Enter Message Here"
          label="Tweet"
          multiline
          autoAdjustHeight
          value={tweet}
          inputProps={{ maxLength: 20 }}
          onChange={(_, newValue) => {
            if (!newValue || newValue.length <= 280) {
              setTweet(newValue || "");
            }
          }}
          className="mb-5 mt-3"
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
    );
  } else {
    return null;
  }
}

function TwitterScreen({ setPage }) {
  const [tweet, setTweet] = useState("");
  const [userId, setUserId] = useState("");
  const [alias, setAlias] = useState("");
  const [connected, setConnected] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.post("/.auth/me").then((userInfo) => {
      if (userInfo && userInfo.data.clientPrincipal != null) {
        setUserId(userInfo.data.clientPrincipal.userId);
        setAlias(userInfo.data.clientPrincipal.userDetails);
      }
      axios
        .get(`/api/.auth/status/bmoe-twitter`, {
          headers: {
            authorizationId: userInfo.data.clientPrincipal.userId,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data !== undefined && response.data === "Connected") {
            setConnected(true);
          }
        });
    });
  }, []);

  const makeConnection = async (e) => {
    var config = {
      method: "post",
      url: "/api/.auth/create/bmoe-twitter",
      headers: {
        authorizationId: userId,
        postLoginRedirectUrl: window.location.href,
      },
    };
    axios(config)
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

  const endConnection = async (e) => {
    var config = {
      method: "post",
      url: "/api/.auth/delete/bmoe-twitter",
      headers: {
        authorizationId: userId,
      },
    };
    axios(config)
      .then(() => {
        setConnected(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      var data = JSON.stringify({
        text: tweet + " @PSI_Interns",
      });
      await axios
        .post(`/api/twitter/tweets`, data, {
          headers: {
            "content-type": "application/json",
            "connector-id": "bmoe-twitter",
            "connection-id": userId,
          },
        })
        .then(() => {
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
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="mb-3"
          >
            <Text
              style={{
                overflow: "hidden",
              }}
              className="mb-4"
            >
              {" "}
              Welcome to PSI Intern Hub. Would you like to post about your
              internship experience to Twitter and get featured on the official
              PSI interns account?{" "}
            </Text>
            <LoginDisplay userId={userId} alias={alias}></LoginDisplay>
            <TwitterConnect
              userId={userId}
              connected={connected}
              makeConnection={makeConnection}
              endConnection={endConnection}
            ></TwitterConnect>
            <TweetDisplay
              connected={connected}
              tweet={tweet}
              setTweet={setTweet}
              loading={loading}
              handleSubmit={handleSubmit}
            ></TweetDisplay>
            <div className="mt-5">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="psi_interns"
                options={{ height: 800 }}
              />
            </div>
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
        <div
          className="mb-5"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ActionButton
            onClick={(e) => {
              setPage(2);
            }}
            iconProps={{ iconName: "Forward" }}
          >
            Next
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default TwitterScreen;
