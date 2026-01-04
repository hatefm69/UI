import { PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { LevelSection } from "../../../sections/baseInformation/levelSection";
import { GetUrl } from "../../../utils/generals";
export default class LevelAddPage extends React.Component {
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
          title="افزودن پایه"
          icon="circle-plus"
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
          <LevelSection record={null} />
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
