import styles from "./App.module.css";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { FontSizes, Text } from "@fluentui/react";
import FormScreen from "./components/FormScreen";
import TwitterScreen from "./components/TwitterScreen";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

function App() {
  initializeIcons();
  const [form, setForm] = useState(true);

  return (
    <Container className={styles.container} fluid>
      <Row className={styles.row}>
        <Col xs={6} style={{ height: "90vh" }} className="p-0">
          <div className={styles.formContainer}>
            <div className={styles.formHeader + " mb-5"}>
              <Text
                style={{ fontSize: FontSizes.xxLargePlus }}
                className={styles.formText}
              >
                {" "}
                DevDiv 2022 Intern Feedback Form{" "}
              </Text>
            </div>
            {form ? (
              <div
                style={{
                  width: "85%",
                }}
              >
                <Text style={{ fontSize: FontSizes.medium }}>
                  {" "}
                  Note: Your contact info and feedback will be used for
                  Microsoft internal purposes only{" "}
                </Text>

                <FormScreen setForm={setForm}></FormScreen>
              </div>
            ) : (
              <TwitterScreen setForm={setForm}></TwitterScreen>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
