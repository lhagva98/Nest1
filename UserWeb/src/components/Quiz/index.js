import React from "react";
import CardImage from "../../asset/images/sport.jpeg";
import { Card, Button, Badge } from "react-bootstrap";
const Quiz = ({ data, startQuiz }) => {
  return (
    <Card>
      <Card.Img variant="top" src={CardImage} />
      <Card.Body>
        <div className="d-flex justify-content-between ">
          <div>
            {data.name}{" "}
            <div style={{ borderRadius: 5, borderWidth: 2 }} className="d-flex">
              <Badge pill variant="danger">
                {" "}
                {data.cardCount}
              </Badge>
              <span className="sr-only"></span>
            </div>
          </div>
          <Button
            variant="info"
            onClick={() => {
              startQuiz(data._id);
            }}
          >
            эхлэх
          </Button>
        </div>
        <Card.Title></Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Quiz;
