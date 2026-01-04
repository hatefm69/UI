import { AlertBox, Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import { GetUrl, HandleError } from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";

export class LevelSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 1000,
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    // Update


    this.setState(
      {
        ...this.props.record,
        updateKey: this.state.updateKey + 1,
      }
    );

  };

  onSubmitSuccess = (response) => {
    // Add
    if (this.props.record == null) {
      this.setState({
        id: "",
        title: "",
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        response.message
      );
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("levelListPage");
      }, 3000);
    }
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت پایه جدید"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/LevelByHatef/Post"
              : "/api/cmi/LevelByHatef/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >

          {this.props.record && (
            <TextBox context={this} name="id" title="کد" readOnly initialValue={this.state.id} />
          )}
          <TextBox
            context={this}
            name="title"
            title="عنوان"
            required
            minLength={2}
            maxLength={100}

            initialValue={this.state.title}
            validateHandler={[Helpers.MinMaxLengthValidator]}
          />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
