import styles from "./App.module.css";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { FontSizes, Text } from "@fluentui/react";
import FormScreen from "./components/FormScreen";
import TwitterScreen from "./components/TwitterScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

function Content(props) {
  if (props.page === 1) {
    return <TwitterScreen setPage={props.setPage}></TwitterScreen>;
  } else if (props.page === 2) {
    return <FeedbackScreen setPage={props.setPage}></FeedbackScreen>;
  } else if (props.page === 3) {
    return <FormScreen setPage={props.setPage}></FormScreen>;
  }
}

function App() {
  initializeIcons();
  const [page, setPage] = useState(1);

  return (
    <Container className={styles.container} fluid>
      <Row className={styles.row}>
        <Col xs={7} style={{ height: "90vh" }} className="p-0">
          <div className={styles.formContainer}>
            <div className={styles.formHeader + " mb-5"}>
              <Text
                style={{ fontSize: FontSizes.xxLargePlus }}
                className={styles.formText}
              >
                {" "}
                Intern Hub{" "}
              </Text>
            </div>
            <Content page={page} setPage={setPage}></Content>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
