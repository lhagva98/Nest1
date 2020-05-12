import React from "react";
import { connect } from "react-redux";
import {
  getQuizList,
  setQuizList,
  getQuestions,
  submitAnswerUser,
  submitAnswerGuest,
  addHistory,
} from "../../actions/quizActions";
import chest from "../../..//src/api/chest";
import { quizDuration } from "../../cofig";
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  Alert,
  Button,
} from "react-bootstrap";
import Quiz from "../../components/Quiz";
import Question from "../../components/question";
import { formatTime } from "../../utils/time";
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      myAnswer: [],
      questionList: [],
      selectedQuiz: null,
      modalShow: false,
      processing: false,
      responseRecevied: false,
      timer: quizDuration,
      response: null,
    };
  }
  componentDidMount() {
    getQuizList()
      .then((res) => {
        console.log(res);
        this.props.dispatch(setQuizList(res.payload));
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 200);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        chest.get("alert").error(err.message);
      });
  }
  startQuiz = (_id) => {
    if (this.state.processing === false) {
      if (this.props.isLogin == true) {
        getQuestions({ categoryId: _id })
          .then((res) => {
            console.log(res);
            const Qlist = res.payload.results;
            const temp = [];
            Qlist.map((item) => {
              temp.push({
                key: item._id,
                selected: -1,
              });
            });
            chest.get("alert").success("Quiz Started");
            this.setState({
              questionList: Qlist,
              selectedQuiz: res.payload.category,
              modalShow: true,
              myAnswer: temp,
              processing: true,
            });
            clearInterval(this.countdown);
            this.countdown = setInterval(() => {
              if (this.state.timer <= 0) {
                this.submit();
              } else this.setState({ timer: this.state.timer - 1 });
            }, 1000);
            setTimeout(() => {
              this.setState({
                loading: false,
              });
            }, 200);
          })
          .catch((err) => {
            this.setState({
              loading: false,
            });
            chest.get("alert").error(err.message);
          });
      } else {
        chest.get("alert").warn("Нэвтрэх шаардлагатай");
      }
    }
  };
  changeAnswer = (key, value) => {
    const { myAnswer } = this.state;
    myAnswer[key].selected = value;
    this.setState({
      myAnswer: myAnswer,
    });
  };
  submit = () => {
    const { selectedQuiz } = this.state;
    const { isGuest } = this.props;
    clearInterval(this.countdown);
    window.scrollTo(0, 0);
    this.setState({ processing: false }, () => {
      if (!isGuest == true) {
        submitAnswerUser({
          answer: this.state.myAnswer,
          quizId: selectedQuiz._id,
        })
          .then((res) => {
            console.log(res);
            this.setState({ responseRecevied: true, response: res.payload });
            const history = res.payload.history;
            history.category = res.payload.category;
            this.props.dispatch(addHistory(res.payload.history));
            chest.get("alert").success("Quiz Finished");
          })
          .catch((err) => {
            chest.get("alert").error(err.message);
          });
      } else {
        submitAnswerGuest({
          answer: this.state.myAnswer,
          quizId: selectedQuiz._id,
        })
          .then((res) => {
            console.log(res);
            this.setState({ responseRecevied: true, response: res.payload });
            chest.get("alert").success("Quiz Finished");
          })
          .catch((err) => {
            chest.get("alert").error(err.message);
          });
      }
    });
  };
  quizFinished = () => {
    if (this.state.processing !== true && this.state.responseRecevied === true)
      this.setState({
        modalShow: false,
        responseRecevied: false,
        processing: false,
        response: null,
        timer: quizDuration,
      });
  };
  render() {
    const { quiz_list } = this.props;
    const {
      modalShow,
      questionList,
      myAnswer,
      responseRecevied,
      response,
    } = this.state;
    return (
      <Container fluid>
        <Row className="d-flex  justify-content-center  p-5">
          {quiz_list.map((item, index) => (
            <Col xs={12} md={4} key={item._id} className="p-3">
              <Quiz key={item._id} data={item} startQuiz={this.startQuiz} />
            </Col>
          ))}
        </Row>
        {modalShow && (
          <Modal
            size="lg"
            show={true}
            onHide={() => {
              this.quizFinished();
            }}
          >
            <Modal.Header closeButton={!this.state.processing}>
              <Modal.Title>
                Тестийн нэр:{this.state.selectedQuiz.name}
              </Modal.Title>
              <Modal.Title>
                Боломжит хугацаа:{formatTime(this.state.timer)}
              </Modal.Title>
            </Modal.Header>
            {responseRecevied && (
              <div className="d-flex mx-auto">
                <Alert key={"success"} variant={"success"}>
                  Зөв хариулсан:{response.right}
                </Alert>
                <Alert key={"danger"} variant={"danger"}>
                  Буруу хариулсан:{response.wrong}
                </Alert>
              </div>
            )}

            <Modal.Body>
              {questionList.map((item, index) => (
                <Question
                  disabled={!this.state.processing}
                  key={item._id}
                  question={item.title}
                  selected={myAnswer[index].selected}
                  groupId={index}
                  options={item.questions}
                  onClick={(key, value) => this.changeAnswer(key, value)}
                />
              ))}
            </Modal.Body>
            {this.state.processing && (
              <Button
                className="m-2"
                variant="info"
                onClick={() => {
                  this.submit();
                }}
              >
                Дуусгах
              </Button>
            )}
          </Modal>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({
  quiz: { quiz_list },
  auth: { isLogin, isGuest },
}) => ({
  quiz_list,
  isLogin,
  isGuest,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
