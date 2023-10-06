import React from "react";
import Button from "react-bootstrap/Button";
// import { Button } from "react-bootstrap";

const MainPage = () => {
  return (
    <>
      <Button variant="primary">Primary</Button>{" "}
      <Button variant="success">Success</Button>{" "}
      <Button as="input" type="button" value="Input" />{" "}
      <Button variant="info">Info</Button>{" "}
      <Button variant="outline-dark">Dark</Button>
    </>
  );
};

export default MainPage;
