import { Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import {
  GetPostSubmitUrl,
  GetUpdateSubmitUrl,
  GetUrl,
  HandleError,
} from "../../utils/generals";
import {
  branchDegreeOptions,
  isActiveOptions,
} from "../../utils/selectOptionUtils";

export default class BranchInspectionDayAllocationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 0,
      isNew: this.props.record == null ? true : false,
    };
    this.notificationSystem = React.createRef();
    this.formName = "branchInspectionDayAllocation";
  }

  componentDidMount() {
    if (this.props.record != null)
      this.setState((prevState) => ({
        ...this.props.record,
        isActive: this.props.record.isActive.toString(),
        branchDegreeId: this.props.record.branchDegreeId.toString(),
        deactivationDate: this.props.record.deactivationDateShamsi
          ? this.props.record.deactivationDateShamsi
          : this.props.todayDateShamsi,
        updateKey: prevState.updateKey + 1,
      }));
  }

  onSubmitSuccess = (res) => {
    if (this.state.isNew == true) {
      this.EmptyComponent();
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `تخصیص روز بازرسی به شعبه جدید با کد '${res.data}' ثبت شد`
      );
    } else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("branchInspectionDayAllocationListPage");
      }, 3000);
    }
  };
  EmptyComponent = () => {
    this.setState({
      branchDegreeId: "",
      inspectionDayNumber: null,
      isActive: "true",
      description: null,
      deactivationDate: null,
      updateKey: this.state.updateKey + 1,
    });
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت تخصیص روز بازرسی به شعبه"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.state.isNew == true
              ? GetPostSubmitUrl(this.formName)
              : GetUpdateSubmitUrl(this.formName)
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          {this.state.isNew == false && (
            <TextBox context={this} name="id" title="کد" readOnly />
          )}
          <DropDown
            context={this}
            name="branchDegreeId"
            title="درجه شعبه"
            required
            options={branchDegreeOptions()}
            initialValue=""
          />
          <TextBox
            context={this}
            name="inspectionDayNumber"
            title="تعداد روز بازرسی"
            required
            minLength={1}
            maxLength={3}
            validateHandler={[
              Helpers.MinMaxLengthValidator,
              Helpers.NumberTypeValidator,
            ]}
          />
          <DropDown
            context={this}
            name="isActive"
            title="وضعیت"
            required
            options={isActiveOptions()}
            initialValue="true"
          />
          {this.state.isActive === "false" && (
            <TextBox
              context={this}
              name="deactivationDate"
              title="تاریخ غیر فعال سازی"
              readOnly
              initialValue={
                this.props.record
                  ? this.state.deactivationDate
                  : this.props.todayDateShamsi
              }
            />
          )}
          <TextBox
            context={this}
            name="description"
            title="شرح"
            lgCol={12}
            mdCol={12}
            multiline
            multilineRows={3}
            maxLength={MaxLengthDescription}
          />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
