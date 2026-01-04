import { PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { StudentSection } from "../../../sections/baseInformation/studentSection";
import { GetUrl } from "../../../utils/generals";
export default class StudentAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.notificationSystem = React.createRef();
  }

  render() {
    return (
      <>
        <PageMain
          context={this}
          isLoading={this.state.isLoading}
          title="افزودن دانش آموز"
          icon="circle-plus"
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
          <StudentSection record={null} />
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
