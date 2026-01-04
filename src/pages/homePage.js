import { PageMain } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { GetUrl } from "../utils/generals";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.notificationSystem = React.createRef();
  }

  render() {
    return (
      <>
        <PageMain
          title="صفحه اصلی"
          icon="home"
          context={this}
          isLoading={this.state.isLoading}
        >
          <a href={GetUrl("LevelListPage")}>فهرست پایه ها</a>
          <br />
          <a href={GetUrl("StudentListPage")}>دانش آموز ها</a>
          <br />
        </PageMain>

        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
