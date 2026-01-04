import { Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { GetUrl, HandleError } from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";

export class ReferralGroupSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 1000,
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    // Update
    if (this.props.record)
      this.setState(() => ({
        ...this.props.record,
        isActive: this.props.record.isActive.toString(),
        updateKey: this.state.updateKey + 1,
      }));
  };

  onSubmitSuccess = (response) => {
    // Add
    if (this.props.record == null) {
      this.setState({
        id: "",
        title: "",
        isActive: "true",
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `گروه ارجاعات جدید با کد '${response.data}' ثبت شد`
      );
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("referralGroupListPage");
      }, 3000);
    }
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت گروه ارجاعات جدید"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/ReferralGroup/Post"
              : "/api/cmi/ReferralGroup/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          {this.props.record && (
            <TextBox context={this} name="id" title="کد" readOnly />
          )}
          <TextBox
            context={this}
            name="title"
            title="عنوان گروه"
            required
            minLength={2}
            maxLength={256}
            validateHandler={[Helpers.MinMaxLengthValidator]}
          />
          <DropDown
            context={this}
            name="isActive"
            title="وضعیت"
            required
            options={isActiveOptions()}
            initialValue="true"
          />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
