import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Redirect } from "react-router";
import { ReducerProps } from "../../../../../api/reducer";
import Input from "../../../../components/Input";
import InputLabel from "../../../../components/InputLabel";
import { ReduxFunction } from "../../../../../api/network/reduxHandler";
import { payloads } from "../../../../../api/namespaces";
import Button from "../../../../components/Button";
import { createCard } from "../../../../../api/actions/adminActions";
import chest from "../../../../../api/chest";
// import Select from "../../../../components/Select";

interface Props extends RouteComponentProps {
  dispatch?: (data: ReduxFunction) => void;
}

export interface State {
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  loading: boolean;
}

class CreateCard extends React.Component<Props, State> {
  mapView: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      question: "",
      answer: 1,
      option1: "",
      option2: "",
      option3: "",
      loading: false,
    };
  }
  answerChange = (event: any) => {
    this.setState({ answer: event.target.value });
  };
  submit = () => {
    const { match } = this.props;
    // @ts-ignore
    const categoryId = match.params.id;
    const { question, answer, option1, option2, option3 } = this.state;
    if (
      question.length === 0 ||
      option1.length === 0 ||
      option2.length === 0 ||
      option3.length === 0
    ) {
      return chest.get("alert").warning("Дутуу талбарыг бөглөнө үү");
    }
    this.setState({
      loading: true,
    });

    createCard({
      title: question,
      answer: answer,
      questions: [option1, option2, option3],
      category: categoryId,
    })
      .then(() => {
        this.setState({
          loading: false,
        });
        chest.get("alert").success("Асуулт амжилттай үүсгэгдэлээ!");
        this.props.history.push(`/`);
      })
      .catch((err) => {
        chest.get("alert").error(err.message);
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <div id="create-delivery" style={{ margin: 20 }} key="cd-2nd-page">
        <div className="card">
          <div className="card-title">Тест Үүсгэх</div>
          <hr />
          <div className="ui gap-10" />
          <div className="ui flex flex-full column">
            <div className="ui flex-full">
              <InputLabel>Асуулт</InputLabel>
              <Input
                disabled={this.state.loading}
                value={this.state.question}
                onChange={(value) => {
                  this.setState({
                    question: value,
                  });
                }}
              />
            </div>
            <div className="gap-20" />
            <div className="ui flex-full">
              <InputLabel>Option 1</InputLabel>
              <Input
                disabled={this.state.loading}
                value={this.state.option1}
                onChange={(value) => {
                  this.setState({
                    option1: value,
                  });
                }}
              />
            </div>
            <div className="gap-20" />
            <div className="ui flex-full">
              <InputLabel>Option 2</InputLabel>
              <Input
                disabled={this.state.loading}
                value={this.state.option2}
                onChange={(value) => {
                  this.setState({
                    option2: value,
                  });
                }}
              />
            </div>
            <div className="gap-20" />
            <div className="ui flex-full">
              <InputLabel>Option 3</InputLabel>
              <Input
                disabled={this.state.loading}
                value={this.state.option3}
                onChange={(value) => {
                  this.setState({
                    option3: value,
                  });
                }}
              />
            </div>
          </div>
          <div className="ui gap-20" />
          <div className="ui flex-full" />
          <InputLabel>Хариулт</InputLabel>
          <select
            value={this.state.answer}
            onChange={this.answerChange}
            disabled={this.state.loading}
          >
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
          </select>
        </div>
        <div className="ui gap-20" />
        <div className="ui flex flex-full">
          <div className="ui flex-full" />
          <Button
            disabled={this.state.loading}
            loading={this.state.loading}
            onClick={this.submit}
          >
            Хадгалах
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ReducerProps) {
  return {};
}

export default withRouter(connect(mapStateToProps)(CreateCard));
