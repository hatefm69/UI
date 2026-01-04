import { Card, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { HandleError } from "../../utils/generals";

export class TestYeKeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 1000,
    };
    this.notificationSystem = React.createRef();
  }

  onSubmitSuccess = (response) => {
    // Add
    if (this.props.record == null) {
      this.setState({
        id: "",
        title: "",
        isActive: "true",
        description: "",
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(this.notificationSystem, "ثبت شد");
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد`
      );
    }
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="TestYeKe"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/TestYeKe/Post"
              : "/api/cmi/TestYeKe/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          {this.props.record && (
            <TextBox context={this} name="id" title="کد" readOnly />
          )}
          <TextBox context={this} name="black" title="black" required />
          <TextBox context={this} name="white" title="white" required />
          <TextBox context={this} name="tick" title="tick" required />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
