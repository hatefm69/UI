import { Helpers, PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { InspectionSubGroupSection } from "../../../sections/baseInformation/inspectionSubGroupSection";
import { GetUrl, HandleError } from "../../../utils/generals";
export default class InspectionSubGroupAddPage extends React.Component {
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
          title="افزودن زیر گروه بازرسی"
          icon="circle-plus"
          context={this}
          footerLinks={[
            { href: "/", text: "صفحه اصلی" },
            { href: "https://banksepah.ir", text: "وب سایت رسمی بانک سپه" },
          ]}
          topButtons={[
            {
              title: "فهرست زیر گروه های بازرسی",
              icon: "list",
              color: "outline-primary",
              url: GetUrl("inspectionSubGroupListPage"),
            },
          ]}
        >
          {this.state.todayDateShamsi != null && (
            <InspectionSubGroupSection
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
