import { Helpers, PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { InspectionGroupSection } from "../../../sections/baseInformation/inspectionGroupSection";
import { GetUrl, HandleError } from "../../../utils/generals";
export default class InspectionGroupAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
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
  };

  render() {
    return (
      <>
        <PageMain
          isLoading={this.state.isLoading}
          title="افزودن گروه بازرسی"
          icon="circle-plus"
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
          {this.state.todayDateShamsi != null && (
            <InspectionGroupSection
              record={null}
              todayDateShamsi={this.state.todayDateShamsi}
            />
          )}
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
