import React from "react";
import { connect } from "react-redux";
import { getHistory, setQuizList } from "../../actions/quizActions";
import chest from "../../..//src/api/chest";
import { Container, Row, Table } from "react-bootstrap";
import formatDate from "../../utils/formatDate";
import { scorePercentage } from "../../utils/score";

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { score_card } = this.props;
    const { loading } = this.state;
    console.log(score_card);
    return (
      <Container fluid>
        <Row className="d-flex  justify-content-center  p-5">
          <Table striped bordered hover size="sm" className="text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Quiz name</th>
                <th>Зөв хариулсан</th>
                <th>Буруу хариулсан</th>
                <th>Гүйцэтгэл</th>
                <th>Огноо</th>
              </tr>
            </thead>
            <tbody>
              {score_card.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category.name}</td>
                  <td>{item.scoreDetials[0]}</td>
                  <td>{item.scoreDetials[1]}</td>
                  <td>{scorePercentage(...item.scoreDetials)}%</td>
                  <td>{formatDate(item.dateCreated)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ quiz: { score_card }, auth: { isLogin } }) => ({
  score_card,
  isLogin,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTable);
