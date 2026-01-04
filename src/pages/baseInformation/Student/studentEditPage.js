import { Helpers, PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { StudentSection } from "../../../sections/baseInformation/studentSection";
import { GetUrl, HandleError } from "../../../utils/generals";
export default class StudentEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { isLoading: false };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/Student/Get/" + this.id,
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
          title="ویرایش دانش آموز"
          icon="edit"
          context={this}
          footerLinks={[
            { href: "/", text: "صفحه اصلی" },
            { href: "https://banksepah.ir", text: "وب سایت رسمی بانک سپه" },
          ]}
          topButtons={[
            {
              title: "فهرست دانش آموز ها",
              icon: "list",
              color: "outline-primary",
              url: GetUrl("studentListPage"),
            },
          ]}
        >
          {this.state.record && <StudentSection record={this.state.record} />}
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
