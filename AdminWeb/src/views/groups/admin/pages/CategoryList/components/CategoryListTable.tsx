import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { payloads } from "../../../../../../api/namespaces";
import { MdAdd } from "react-icons/md";
import Spinner from "../../../../../components/Spinner";
import Button from "../../../../../components/Button";
import colors from "../../../../../../styles/colors";
import * as adminActions from "../../../../../../api/actions/adminActions";
import chest from "../../../../../../api/chest";
// import  ConfirmDialog  from "../../../components/ConfirmDialog";
import { Redirect } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  categories: payloads.CategoryList[];
  fetchData: () => void;
  status: number;
}

interface State {
  loading: boolean;
  modal: boolean;
}

class CategoryListTable extends React.Component<Props, State> {
  // mapCoordViewer: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      modal: false,
    };
  }
  edit(id: string) {
    this.props.history.push(`/create-card/${id}`);
  }
  // deleteItem(id: string) {
  //   this.setState({
  //     loading: true,
  //   });
  //   adminActions
  //     .deleteDriver(id)
  //     .then((res) => {
  //       this.setState({
  //         loading: false,
  //       });
  //       this.props.fetchData();
  //       chest.get("alert").success("Driver successfully deleted!");
  //     })
  //     .catch((err: Error) => {
  //       chest.get("alert").error(err.message);
  //       this.setState({
  //         loading: false,
  //       });
  //     });
  // }
  renderItem(item: any, i: number) {
    return (
      <tr key={"service-list-" + i}>
        <td>{item.name}</td>
        <td>{item.cardCount}</td>
        <td>
          <div className="ui flex">
            <Button
              disabled={this.state.loading}
              icon={true}
              onClick={this.edit.bind(this, item._id)}
            >
              <MdAdd fill="#fff" />
            </Button>
            <div className="gap-20" />
            {/* <Button
              disabled={this.state.loading}
              backgroundColor={colors.red}
              icon={true}
              onClick={this.deleteItem.bind(this, item._id)}
            >
              <MdClose fill="#fff" />
            </Button> */}
            <div className="gap-20" />
          </div>
        </td>
      </tr>
    );
  }
  render() {
    const { categories, status } = this.props;
    console.log(categories);
    return (
      <div id="rp-table">
        {/* <MapCoordViewer ref={ref => (this.mapCoordViewer = ref)} /> */}
        <table>
          <tbody>
            <tr>
              <th>Ангилалын нэр</th>
              <th>Тестийн тоо</th>
              <th>Дэлгэрэнгүй</th>
            </tr>
            {status !== 100
              ? categories.map((item, i: number) => this.renderItem(item, i))
              : null}
          </tbody>
        </table>
        {status === 100 ? (
          <div className="ui flex flex-full j-cr ai-c">
            <div style={{ padding: 40 }}>
              <Spinner color="#888" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(CategoryListTable);
