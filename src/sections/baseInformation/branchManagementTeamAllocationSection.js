import { AutoComplete, Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import {
  GetPostSubmitUrl,
  GetUpdateSubmitUrl,
  GetUrl,
  HandleError,
} from "../../utils/generals";
import {
  isActiveOptions,
  referralGroupTeamAllocationOptions,
} from "../../utils/selectOptionUtils";

export default class BranchManagementTeamAllocationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      updateKey: 1000,
      inspectorProfile: [],
    };
    this.notificationSystem = React.createRef();
    this.formName = "branchManagementTeamAllocation";
  }
  componentDidMount = () => {
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/InspectorProfile/GetAllForDropDown/" + ProfileTypes.Inspector,
      {},
      (response) => {
        console.log("res", response);
        this.setState({
          inspectorProfile: response,
          updateKey: this.state.updateKey + 1,
        });
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false })
    );

    if (this.props.record != null) {
      this.setState((prevState) => ({
        ...this.props.record,
        inspectorProfileId: this.props.record.inspectorProfileId.toString(),
        regionCode: this.props.record.regionCode.toString(),
        referralGroupId: this.props.record.referralGroupId.toString(),
        isActive: this.props.record.isActive.toString(),
        deactivationDate: this.props.record.deactivationDateShamsi
          ? this.props.record.deactivationDateShamsi
          : this.props.todayDateShamsi,
        updateKey: prevState.updateKey + 1,
      }));
    }
  };
  addTeamAllocation = () => {};
  emptyRegionDropDown = (e) => {
    if (
      !e ||
      (e.value && this.state.referralGroupId === e.value) ||
      !this.state.regionCode
    )
      return;
    this.setState({
      regionCode: "",
      updateKey: this.state.updateKey + 1,
    });
  };
  isUsed = () => {
    //return this.props.record && this.props.record.isUsed
  };
  onSubmitSuccess = (res) => {
    if (this.props.record == null) {
      this.EmptyComponent();
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `تخصیص تیم مدیریت شعبه جدید ثبت شد.`
      );
    } else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("branchManagementTeamAllocationListPage");
      }, 3000);
    }
  };

  EmptyComponent = () => {
    this.setState({
      referralGroupId: "",
      inspectorProfileId: "",
      isActive: "true",
      regionCode: "",
      deactivationDate: "",
      updateKey: this.state.updateKey + 1,
    });
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت تخصیص تیم مدیریت شعبه"
          icon="forms"
          hasDefaultSaveButton
          statusColor="primary"
          key={this.state.updateKey}
          submitUrl={
            this.props.record == null
              ? GetPostSubmitUrl(this.formName)
              : GetUpdateSubmitUrl(this.formName)
          }
          onSubmitError={(error) => HandleError(this.notificationSystem, error)}
          onBeforeSubmit={this.onBeforeSubmit}
          onSubmitSuccess={this.onSubmitSuccess}
        >
          <div className="row">
            <DropDown
              context={this}
              name="referralGroupId"
              title="گروه"
              options={referralGroupTeamAllocationOptions()}
              required
              changeHandler={this.emptyRegionDropDown}
              //disabled={this.isUsed()}
            />

            <DropDown
              context={this}
              name="inspectorProfileId"
              title="کارشناس"
              options={this.state.inspectorProfile}
              required
              //disabled={this.isUsed()}
            />
            <AutoComplete
              context={this}
              name="regionCode"
              title="منطقه"
              notificationSystem={this.notificationSystem}
              remoteUrl="/api/cmi/Share/GetAfraRegions"
              required
              externalData={
                this.props.record == null
                  ? []
                  : [
                      {
                        label: this.props.record.regionName,
                        value: this.props.record.regionCode,
                      },
                    ]
              }
              //disabled={this.isUsed()}
            />
          </div>
          <div className="row">
            <DropDown
              context={this}
              name="isActive"
              title="وضعیت"
              options={isActiveOptions()}
              required
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
          </div>
        </Card>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
