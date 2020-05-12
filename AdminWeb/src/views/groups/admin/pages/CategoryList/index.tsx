import * as React from "react";
import { connect } from "react-redux";
import CategoryListTable from "./components/CategoryListTable";
import * as adminActions from "../../../../../api/actions/adminActions";
import { ReducerProps } from "../../../../../api/reducer";
import { ReduxFunction } from "../../../../../api/network/reduxHandler";
import { payloads } from "../../../../../api/namespaces";
import Button from "../../../../components/Button";
import CustomModal from "../../../../components/CreateDialog";
import colors from "../../../../../styles/colors";
import {
  createCategory,
  addCategory,
} from "../../../../../api/actions/adminActions";
import { MdAdd, MdAddCircle } from "react-icons/md";
import chest from "../../../../../api/chest";
import { NetworkResponse } from "../../../../../api/network/fetchHandler";
interface Props {
  dispatch?: (data: ReduxFunction) => void;
  categories: payloads.CategoryList[];
  status: number;
}

class CategoryList extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
    };
  }
  componentDidMount(): void {
    this.fetchData();
  }
  fetchData() {
    this.props.dispatch(adminActions.getCategories());
  }
  createCategory = (name: string) => {
    this.setState({ loading: true }, () => {
      createCategory({
        name: name,
      })
        .then((res: any) => {
          const id = res.payload.category._id;
          this.setState({
            loading: false,
            modalShow: false,
          });
          chest.get("alert").success("Төрөл  амжилттай үүсгэгдэлээ!");
          this.props.dispatch(
            addCategory({ name: name, cardCount: 0, _id: id })
          );
        })
        .catch((err) => {
          chest.get("alert").error(err.message);
          this.setState({
            loading: false,
          });
        });
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div style={{ margin: 20 }}>
        <div className="ui gap-20" />
        <Button
          className="ui flex-full"
          disabled={this.state.loading}
          icon={true}
          onClick={() => this.setState({ modalShow: true })}
        >
          <MdAddCircle fill="#fff" />
        </Button>
        <div className="gap-20" />
        <CategoryListTable
          fetchData={this.fetchData.bind(this)}
          {...this.props}
        />
        <CustomModal
          title="Төрөл үүсгэх"
          visible={this.state.modalShow}
          back={() => this.setState({ modalShow: false })}
          loading={this.state.loading}
          submit={(input) => this.createCategory(input)}
        />
      </div>
    );
  }
}

function mapStateToProps(state: ReducerProps) {
  return {
    categories: state.categories.categories,
    status: state.categories.status,
  };
}

export default connect(mapStateToProps)(CategoryList);
