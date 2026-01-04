import { Component } from "react";
import React from "react";
import {
  Card,
  Helpers,
  FileUploader,
  DropDown,
  Table,
  PageMain,
  AlertBox,
} from "core";
import { checkDataIsValid } from "../../../utils/selectOptionUtils";
import { HandleError, DownloadBlobFile } from "../../../utils/generals";
import NotificationSystem from "react-notification-system";

export default class CalendarSettingPage extends Component {
  constructor(props) {
    super(props);

    this.isNew = this.props.isNew;

    this.state = {
      year: null,
      formData: {},
      isLoaded: false,
      updateKey: 1,
      yearOptions: [],
    };

    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    var yearOptions = [];
    for (let index = 1404; index < 1431; index++) {
      yearOptions.push({ name: index, value: index, label: index });
    }
    this.setState({
      yearOptions,
      updateKey: this.state.updateKey + 1,
    });
  }

  onSubmitError = (errorResponse) => {
    return HandleError(this.notificationSystem, errorResponse);
  };

  onBeforeSubmit = () => {
    let formData = this.state.formData;
    formData["year"] = this.state.year;

    this.setState({
      formData,
    });

    return true;
  };

  onSubmitSuccess = (e) => {
    if (checkDataIsValid(e)) {
      this.setState({
        files: null,
        updateKey: this.state.updateKey + 1,
      });
      Helpers.DisplaySuccessMessage(this.notificationSystem, e.data.message);
    } else {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        e,
        e.response.data.message
      );
    }
  };

  downloadExcel = () => {
    this.setState({ isLoading: true });
    Helpers.CallServer(
      "/api/cmi/CalendarSetting/GetExcelFileByYear/" + this.state.year,
      {},
      (response) => {
        DownloadBlobFile(
          response,
          "روزهای تعطیل سال " + this.state.year + ".xlsx"
        );
      },
      (error) => HandleError(this.notificationSystem, error),
      () => this.setState({ isLoading: false }),
      "POST",
      "blob"
    );
  };

  render() {
    return (
      <>
        <PageMain
          title="ثبت تعطیلات سالیانه"
          icon="circle-plus"
          isLoading={this.state.isLoading}
          topButtons={[
            {
              title: "دریافت فایل نمونه",
              url: () => this.downloadExcel(),
              color: "outline-success",
              icon: "download",
            },
          ]}
          footerLinks={[{ href: "/", text: "صفحه اصلی" }]}
        >
          <AlertBox context={this} type="success" hasIcon>
            تا قبل از صدور اولین حکم امکان بارگذاری تعطیلات به دفعات وجود دارد
          </AlertBox>
          {this.state.yearOptions.length > 0 && (
            <Card
              context={this}
              title=""
              submitUrl={"/api/cmi/CalendarSetting/Post/" + this.state.year}
              hasBackButton={true}
              statusColor="primary"
              onSubmitError={this.onSubmitError}
              onSubmitSuccess={(e) => this.onSubmitSuccess(e)}
              onBeforeSubmit={(e) => this.onBeforeSubmit(e)}
              hasDefaultSaveButton={true}
              formData={this.state.formData}
            >
              <DropDown
                context={this}
                initialValue={this.state.yearOptions[0].value}
                title="سال"
                name="year"
                options={this.state.yearOptions}
                notificationSystem={this.notificationSystem}
              />
              <FileUploader
                context={this}
                name="files"
                title="بارگزاری اطلاعات"
                lgCol={4}
                key={this.state.updateKey}
                validExtensions={[".xlsx", ".xls"]}
                maxLength={1048576 * 5}
                required
              />
            </Card>
          )}
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
