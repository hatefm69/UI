import { Component } from "react";
import React from "react";
import {
  AutoComplete,
  Card,
  TextBox,
  Helpers,
  FileUploader,
  DropDown,
  Table,
} from "core";
import { HandleError, GetUrl } from "../utils/generals";
import NotificationSystem from "react-notification-system";
import {
  typeDataEntryOptions,
  checkDataIsValid,
  isActiveOptions,
} from "../utils/selectOptionUtils";
import { afraMethodUrls } from "../utils/constants";

class DistanceSection extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.isNew = this.props.isNew;

    if (this.isNew) {
      this.state = {
        id: this.id,
        formData: {},
        isLoaded: false,
        isConvert: "false",
        updateKey: 1,
        updateKey1: 1,
        updateErrorKey: 1,
        errorList: [],
      };
    } else {
      this.item = this.props.item;
      this.state = {
        id: this.id,
        formData: {},
        isLoaded: false,
        isConvert: "false",
        updateKey: 1,
        updateErrorKey: 1,
        errorList: [],
        fromUnit: this.item.fromUnit,
        toUnit: this.item.toUnit,
        toRegion: this.item.toRegion,
        value: this.item.value,
        isActive: this.item.isActive ? "true" : "false",
        deactivationDate: this.item.deactivationDate,
      };
    }

    this.pageInfo = {
      title: "ثبت مسافت",
      icon: "circle-plus",
    };

    this.notificationSystem = React.createRef();
  }

  onSubmitError = (errorResponse) => {
    return HandleError(this.notificationSystem, errorResponse.response.data.message);
  };

  componentDidMount = () => {
    // if (!this.isNew && this.props.item != null) {
    //   this.setState(this.props.item);
    //   this.setState({
    //     isLoaded: true,
    //   });
    // }
    this.setState({
      isLoaded: true,
    });
  };

  onBeforeSubmit() {
    this.setState({
      errorList: [],
      updateErrorKey: this.state.updateErrorKey + 1,
    });
    if (this.state.isConvert == "false")
      if (isNaN(this.state.value) || this.state.value <= 0) {
        Helpers.DisplayErrorMessage(
          this.notificationSystem,
          null,
          "مقدار مسافت صحیح نمی باشد"
        );
        return false;
      }

    let formData = this.state.formData;
    formData["fromUnit"] = this.state.fromUnit;
    formData["id"] = this.id;
    formData["toRegion"] = this.state.toRegion;
    formData["toUnit"] = this.state.toUnit;
    formData["value"] = this.state.value;
    formData["files"] = this.state.files;
    formData["isConvert"] = this.state.isConvert;
    formData["isActive"] = this.state.isActive;

    this.setState({
      formData,
    });

    return true;
  }

  onChangeIsConvert(e) {
    if (e.value) {
      this.setState({
        files: null,
        filesIsValid: true,
        filesValidFeedBack: "",
        fromUnit: null,
        fromUnitIsValid: true,
        fromUnitValidFeedBack: "",
        toRegion: null,
        toRegionIsValid: true,
        toRegionValidFeedBack: "",
        toUnit: null,
        toUnitIsValid: true,
        toUnitValidFeedBack: "",
        value: null,
        valueIsValid: true,
        valueValidFeedBack: "",
        errorList: [],
        // updateKey: this.state.updateKey + 1,
      });
    }
    return true;
  }

  onSubmitSuccess(e) {
    if (checkDataIsValid(e)) {
      if (this.isNew) {
        if (e.data.errorList == null) {
          Helpers.DisplaySuccessMessage(
            this.notificationSystem,
            " اطلاعات با موفقیت ثبت شد ....."
          );
          //   window.location.href = GetUrl("distanceListPage");
          this.setState({
            files: null,
            filesIsValid: true,
            filesValidFeedBack: "",
            fromUnit: null,
            fromUnitIsValid: true,
            fromUnitValidFeedBack: "",
            toUnit: null,
            toUnitIsValid: true,
            toUnitValidFeedBack: "",
            toRegion: null,
            toRegionIsValid: true,
            toRegionValidFeedBack: "",
            value: null,
            valueIsValid: true,
            valueValidFeedBack: "",
            updateKey: this.state.updateKey + 1,
          });
        } else if (e.data.errorList.length == 0) {
          Helpers.DisplaySuccessMessage(
            this.notificationSystem,
            "درخواست با موفقیت انجام شد ، در حال انتقال به فهرست مسافت های ثبت شده ....."
          );
          window.location.href = GetUrl("distanceListPage");
        } else {
          var errorList = [];
          for (let index = 0; index < e.data.errorList.length; index++) {
            errorList.push([{ name: "error", value: e.data.errorList[index] }]);
          }
          this.setState({
            errorList: errorList,
            updateErrorKey: this.state.updateErrorKey + 1,
          });
        }
      } else {
        Helpers.DisplaySuccessMessage(
          this.notificationSystem,
          "درخواست با موفقیت انجام شد ، در حال انتقال به فهرست مسافت های ثبت شده ....."
        );
        window.location.href = GetUrl("distanceListPage");
      }
    } else {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        "در پردازش درخواست مشکلی پیش آمده است"
      );
    }
  }

  toRegionChanged = (e) => {
    this.setState({
      toUnit:null,
      updateKey1: this.state.updateKey1 + 1,
    });
  };

  render() {
    return (
      <>
        {(this.isNew || this.state.isLoaded) && (
          <Card
            context={this}
            title="مشخصات مسافت"
            submitUrl={
              this.isNew ? "/api/CMI/Distance/Post" : "/api/CMI/Distance/Update"
            }
            hasBackButton={true}
            statusColor="primary"
            onSubmitError={this.onSubmitError}
            onSubmitSuccess={(e) => this.onSubmitSuccess(e)}
            onBeforeSubmit={(e) => this.onBeforeSubmit(e)}
            hasDefaultSaveButton={true}
            formData={this.state.formData}
            //   key={this.state.updateKey + 1}
          >
            <div className="row">
              {this.isNew ? (
                <DropDown
                  context={this}
                  name="isConvert"
                  initialValue={"false"}
                  title="نوع ورود اطلاعات"
                  options={typeDataEntryOptions()}
                  changeHandler={(e) => this.onChangeIsConvert(e)}
                  notificationSystem={this.notificationSystem}
                  updateKey={this.state.updateKey + 1}
                />
              ) : null}
            </div>
            {!this.isNew || this.state.isConvert == "false" ? (
              <>
                <AutoComplete
                  context={this}
                  name="fromUnit"
                  title="واحد مبدا"
                  remoteUrl={afraMethodUrls.getOfficesAndBranchManagements}
                  externalData={
                    this.isNew
                      ? []
                      : [
                          {
                            label: this.props.item.fromUnitTitle,
                            value: this.props.item.fromUnit,
                          },
                        ]
                  }
                  required
                  lgCol={4}
                  notificationSystem={this.notificationSystem}
                  key={"from" + this.state.updateKey + 1}
                />

                <AutoComplete
                  context={this}
                  name="toRegion"
                  title="منطقه مقصد"
                  remoteUrl={afraMethodUrls.getRegionAll}
                  externalData={
                    this.isNew
                      ? []
                      : [
                          {
                            label: this.props.item.toRegionTitle,
                            value: this.props.item.toRegion,
                          },
                        ]
                  }
                  changeHandler={this.toRegionChanged}
                  required
                  lgCol={4}
                  notificationSystem={this.notificationSystem}
                  key={"toRegion" + this.state.updateKey + 1}
                />

                {this.state.toRegion && (
                  <AutoComplete
                    context={this}
                    name="toUnit"
                    title="شعبه مقصد"
                    remoteUrl={`${afraMethodUrls.getUnitAll}/${this.state.toRegion}`}
                    externalData={
                      this.isNew
                        ? []
                        : [
                            {
                              label: this.props.item.toUnitTitle,
                              value: this.props.item.toUnit,
                            },
                          ]
                    }
                    required
                    lgCol={4}
                    notificationSystem={this.notificationSystem}
                    key={"toUnit" + this.state.updateKey1 + 1}
                  />
                )}

                <DropDown
                  context={this}
                  name="isActive"
                  title="وضعیت"
                  required={this.state.isConvert == "true"}
                  options={isActiveOptions()}
                  initialValue={this.isNew ? "true" : this.state.isActive}
                />
                {this.state.isActive == "false" && (
                  <TextBox
                    context={this}
                    name="deactivationDate"
                    title="تاریخ غیرفعال سازی"
                    initialValue={
                      this.isNew
                        ? this.props.todayDateShamsi
                        : this.item.deactivationDateShamsi
                    }
                    readOnly
                  />
                )}

                <TextBox
                  context={this}
                  name="value"
                  title="مسافت(برحسب کیلومتر)"
                  maxLength={5}
                  validateHandler={[
                    Helpers.NumberTypeValidator,
                    Helpers.MaxLengthValidator,
                  ]}
                  required
                  lgCol={4}
                  key={"value" + this.state.updateKey + 1}
                />
              </>
            ) : null}

            {this.state.isConvert == "true" ? (
              <>
                <FileUploader
                  className="uploader-distance-error-list"
                  context={this}
                  name="files"
                  title="بارگزاری اطلاعات"
                  validExtensions={[".xlsx"]}
                  lgCol={4}
                  required
                />
                {this.state.errorList && this.state.errorList.length > 0 && (
                    <Table
                      headers={[{ title: "خطا", name: "error" }]}
                      data={this.state.errorList}
                      minHeightTableWrapper={200}
                      key={"errorTbl" + this.state.updateErrorKey}
                    />
                  )}
              </>
            ) : null}
          </Card>
        )}
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
export default DistanceSection;
