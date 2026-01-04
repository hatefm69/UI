import { AlertBox, Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import { GetUrl, HandleError } from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";

export class InspectionGroupSection extends React.Component {
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
        deactivationDate: this.props.record.deactivationDateShamsi
          ? this.props.record.deactivationDateShamsi
          : this.props.todayDateShamsi,
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
        description: "",
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `گروه بازرسی جدید با کد '${response.data}' ثبت شد`
      );
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("inspectionGroupListPage");
      }, 3000);
    }
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت گروه بازرسی جدید"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/InspectionGroup/Post"
              : "/api/cmi/InspectionGroup/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          {this.props.record &&
            this.props.record.isUsedInOtherEntities.isUsed == true && (
              <AlertBox type="warning" isImportant>
                {`از این گروه بازرسی در "${this.props.record.isUsedInOtherEntities.entityNames}"  استفاده شده است ، فقط میتوانید وضعیت را تغییر دهید`}
              </AlertBox>
            )}

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
            readOnly={
              this.props.record &&
              this.props.record.isUsedInOtherEntities.isUsed == true
            }
          />
          <DropDown
            context={this}
            name="isActive"
            title="وضعیت"
            required
            options={isActiveOptions()}
            initialValue="true"
          />
          {this.state.isActive == "false" && (
            <TextBox
              context={this}
              name="deactivationDate"
              title="تاریخ غیرفعال سازی"
              initialValue={
                this.props.record
                  ? this.state.deactivationDate
                  : this.props.todayDateShamsi
              }
              readOnly
            />
          )}
          <TextBox
            context={this}
            name="description"
            title="شرح"
            lgCol={12}
            multiline
            multilineRows={3}
            maxLength={MaxLengthDescription}
            readOnly={
              this.props.record &&
              this.props.record.isUsedInOtherEntities.isUsed == true
            }
          />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
