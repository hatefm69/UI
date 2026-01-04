import { Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import { GetUrl, HandleError } from "../../utils/generals";
import {
  isActiveOptions,
  referralGroupOptions,
} from "../../utils/selectOptionUtils";

export class InspectorProfileReferralGroupSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateKey: 1000,
      inspectorProfiles: [],
      referralGroupId: null,
      inspectorProfileId: null,
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount = () => {
    this.getInspectorProfiles();

    // Update
    if (this.props.record)
      this.setState(() => ({
        ...this.props.record,
        referralGroupId: this.props.record.referralGroupId.toString(),
        inspectorProfileId: this.props.record.inspectorProfileId.toString(),
        deactivationDate: this.props.record.deactivationDateShamsi
          ? this.props.record.deactivationDateShamsi
          : this.props.todayDateShamsi,
        isActive: this.props.record.isActive.toString(),
        updateKey: this.state.updateKey + 1,
      }));
  };

  getInspectorProfiles = () => {
    Helpers.CallServer(
      "/api/cmi/InspectorProfile/GetAllForDropDown/" + ProfileTypes.Referred,
      {},
      (response) => {
        this.setState({
          inspectorProfiles: response,
          updateKey: this.state.updateKey + 1,
        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false })
    );
  };

  onSubmitSuccess = () => {
    // Add
    if (this.props.record == null) {
      this.setState({
        referralGroupId: null,
        inspectorProfileId: null,
        isActive: "true",
        description: "",
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ثبت شد ، می توانید مورد جدیدی را ثبت نمایید`
      );
    }
    // Update
    else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("inspectorProfileReferralGroupListPage");
      }, 3000);
    }
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت تخصیص ارجاع گیرنده به گروه ارجاعات جدید"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? "/api/cmi/InspectorProfileReferralGroup/Post"
              : "/api/cmi/InspectorProfileReferralGroup/Update"
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          <DropDown
            context={this}
            name="inspectorProfileId"
            title="ارجاع گیرنده"
            options={this.state.inspectorProfiles}
            required
            notificationSystem={this.notificationSystem}
          ></DropDown>
          <DropDown
            context={this}
            name="referralGroupId"
            title="گروه ارجاعات"
            options={referralGroupOptions()}
            required
            notificationSystem={this.notificationSystem}
          ></DropDown>
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
          />
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
