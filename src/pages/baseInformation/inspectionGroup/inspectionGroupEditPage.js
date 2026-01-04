import { Helpers, PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { InspectionGroupSection } from "../../../sections/baseInformation/inspectionGroupSection";
import { GetUrl, HandleError } from "../../../utils/generals";
export default class InspectionGroupEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { isLoading: false };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/Share/GetTodayDateShamsi",
      {},
      (response) => {
        this.setState({
          todayDateShamsi: response,
        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false }),
      "GET"
    );
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/InspectionGroup/GetWithIsUsedInOtherEntities/" + this.id,
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
          title="ویرایش گروه بازرسی"
          icon="edit"
          context={this}
          footerLinks={[
            { href: "/", text: "صفحه اصلی" },
            { href: "https://banksepah.ir", text: "وب سایت رسمی بانک سپه" },
          ]}
          topButtons={[
            {
              title: "فهرست گروه های بازرسی",
              icon: "list",
              color: "outline-primary",
              url: GetUrl("inspectionGroupListPage"),
            },
          ]}
        >
          {this.state.todayDateShamsi != null && this.state.record && (
            <InspectionGroupSection
              record={this.state.record}
              todayDateShamsi={this.state.todayDateShamsi}
            />
          )}
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
