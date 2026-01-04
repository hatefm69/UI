import { Helpers, PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { LevelSection } from "../../../sections/baseInformation/levelSection";
import { GetUrl, HandleError } from "../../../utils/generals";
export default class LevelEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { isLoading: false };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/LevelByHatef/Get/" + this.id,
      {},
      (response) => {
        this.setState({
          record: response.data,
        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false }),
      "GET"
    );
  };

  render() {
    return (
      <>
        <PageMain
          isLoading={this.state.isLoading}
          title="ویرایش پایه"
          icon="edit"
          context={this}
          footerLinks={[
            { href: "/", text: "صفحه اصلی" },
            { href: "https://banksepah.ir", text: "وب سایت رسمی بانک سپه" },
          ]}
          topButtons={[
            {
              title: "فهرست پایه ها",
              icon: "list",
              color: "outline-primary",
              url: GetUrl("levelListPage"),
            },
          ]}
        >
          {this.state.record && <LevelSection record={this.state.record} />}
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
