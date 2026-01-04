import { Card, DropDown, Helpers, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import {
  GetPostSubmitUrl,
  GetUpdateSubmitUrl,
  HandleError,
  getLastShamsiDayByYear,
} from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";

export default class InspectionPeriodSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      updateKey: 1000,
      year: "",
    };
    this.notificationSystem = React.createRef();
    this.formName = "inspectionPeriod";
  }
  componentDidMount() {
    if (this.props.record != null)
      this.setState((prevState) => ({
        ...this.props.record,
        isActive: this.props.record.isActive.toString(),
        deactivationDate: this.props.record.deactivationDateShamsi
          ? this.props.record.deactivationDateShamsi
          : this.props.todayDateShamsi,
        fromDate: this.props.record.fromDateShamsi,
        toDate: this.props.record.toDateShamsi,
        updateKey: prevState.updateKey + 1,
      }));
  }

  onBeforeSubmit = (e) => {
    if (this.state.year == "") {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "سال را وارد نمایید."
      );
      this.emptyFromDateAndToDateState();
      return false;
    }
    return true;
  };

  onSubmitSuccess = (res) => {
    if (this.props.record == null) {
      this.EmptyComponent();
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `دوره بازرسی جدید با کد '${res.data}' ثبت شد`
      );
    } else {
      Helpers.DisplaySuccessMessage(
        this.notificationSystem,
        `با موفقیت ویرایش شد ، در حال انتقال به فهرست ...`
      );
      setInterval(() => {
        window.location.href = GetUrl("inspectionPeriodListPage");
      }, 3000);
    }
  };
  EmptyComponent = () => {
    this.setState({
      title: "",
      year: "",
      isActive: "true",
      fromDate: "",
      toDate: "",
      description: "",
      deactivationDate: "",
      updateKey: this.state.updateKey + 1,
    });
  };
  emptyFromDateAndToDateState = () => {
    this.setState({
      year: "",
      fromDate: "",
      toDate: "",
      updateKey: this.state.updateKey + 1,
    });
  };
  handleBlur = (e) => {
    var value = e.target.value;
    if (
      e == null ||
      e == undefined ||
      e == "" ||
      value == null ||
      value == "" ||
      value.trim() == ""
    ) {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "سال باید وارد شود."
      );
      this.emptyFromDateAndToDateState();
      return;
    }
    const yearValue = parseInt(value);
    if (isNaN(yearValue)) {
      this.emptyFromDateAndToDateState();
      return;
    }
    if (yearValue < 1300 || yearValue > 1500) {
      Helpers.DisplayErrorMessage(
        this.notificationSystem,
        null,
        "مقدار سال باید معتبر وارد شود(بین 1300 تا 1500)."
      );
      this.emptyFromDateAndToDateState();
      return;
    }

    let lastDayOfYear = getLastShamsiDayByYear(value);
    let firstYear = `${yearValue}/01/01`;
    let endYear = `${yearValue}/12/${lastDayOfYear}`;
    this.setState({
      fromDate: firstYear,
      toDate: endYear,
      year: yearValue,
      updateKey: this.state.updateKey + 1,
    });
  };

  render() {
    return (
      <>
        <Card
          hasCollapsibleButton
          context={this}
          title="ثبت دوره بازرسی"
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
          {this.props.record != null && (
            <TextBox context={this} name="id" title="کد" readOnly />
          )}
          <TextBox
            context={this}
            name="title"
            title="عنوان دوره"
            minLength={1}
            maxLength={256}
            required
          />

          <div class="col-md-6 col-lg-4 my-3">
            <div class="form-group">
              <label class="form-label required " for="input-year">
                سال
              </label>
              <input
                type="text"
                name="year"
                class="form-control"
                id="input-year"
                placeholder="سال را وارد نمایید"
                maxlength="4"
                value={this.state.year || ""}
                onBlur={this.handleBlur}
                onChange={(e) => this.setState({ year: e.target.value })}
              />
              {this.state.year == "" && (
                <div class="invalid-feedback d-block">سال را وارد نمایید</div>
              )}
              <small class="text-muted d-none"></small>
            </div>
          </div>
          <DropDown
            context={this}
            name="isActive"
            title="وضعیت"
            required
            options={isActiveOptions()}
            initialValue="true"
          />
          <TextBox
            context={this}
            name="fromDate"
            title="از تاریخ"
            maxLength={10}
            readOnly
          />
          <TextBox
            context={this}
            name="toDate"
            title="تا تاریخ"
            maxLength={10}
            readOnly
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
