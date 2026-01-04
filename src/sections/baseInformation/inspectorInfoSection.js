import {
  AutoComplete,
  CellContainer,
  CheckBox,
  Delimiter,
  DropDown,
  Helpers,
  ImageUploader,
  TextBox,
  DatePicker,
  Table,
  RemoteDropDown,
} from "core";
import React from "react";
import react from "react";
import NotificationSystem from "react-notification-system";
import {
  dayOffOptions,
  expertiseItemOptions,
  inspectionStatusOptions,
  mergedBankOptions,
  educationDegreeOptions,
  userTypeOptions,
} from "../../utils/selectOptionUtils";
import Button from "../../components/button";
import { dayOff, inspectionStatus, userType } from "../../utils/constants";
import AutoCompleteLookUp from "../../components/autoCompleteLookUp";

class InspectorInfoSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.notificationSystem = react.createRef();
  }

  render() {
    return (
      <>
        <CellContainer lgCol={12} mdCol={12} header="">
          <DropDown
            context={this.props.parentContext}
            name="userType"
            title="نوع کاربر"
            options={userTypeOptions()}
            notificationSystem={this.notificationSystem}
            required={!this.props.parentState.isReadOnly}
            lgCol={4}
            mdCol={4}
            // changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
            // initialValue={inspectionStatus.active}
            // disabled={this.props.parentState.isReadOnly}
          />
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <AutoComplete
                context={this.props.parentContext}
                name="inspectorPersonnelCode"
                title="بازرس / ارجاع گیرنده"
                notificationSystem={this.notificationSystem}
                remoteUrl="/api/cmi/share/getPersonnelDetail"
                lgCol={12}
                mdCol={12}
                required={this.props.parentState.isNew}
                externalData={
                  this.props.parentState.isNew
                    ? []
                    : [
                        {
                          label: this.props.parentState.personnelName,
                          value: this.props.parentState.inspectorPersonnelCode,
                        },
                      ]
                }
                changeHandler={(e) => this.props.onChangeInspector(e)}
                disabled={!this.props.parentState.isNew}
              />
            </div>
            <div
              className="col-lg-4 col-md-12"
              key={
                "mobileNumber" + this.props.parentState.personnelDetailUpdateKey
              }
            >
              {this.props.parentState.inspectorPersonnelCode === "" && (
                <TextBox
                  context={this.props.parentContext}
                  name="emptyMobileNumber"
                  title="تلفن همراه"
                  readOnly
                  lgCol={12}
                  mdCol={12}
                  initialValue=""
                  externalChangedValue=""
                />
              )}
              {this.props.parentState.inspectorPersonnelCode !== "" && (
                <TextBox
                  context={this.props.parentContext}
                  name="mobileNumber"
                  title="تلفن همراه"
                  readOnly
                  lgCol={12}
                  mdCol={12}
                />
              )}
            </div>
            <div
              className="col-lg-4 col-md-12"
              key={
                "nationalCode" + this.props.parentState.personnelDetailUpdateKey
              }
            >
              {this.props.parentState.inspectorPersonnelCode === "" && (
                <TextBox
                  context={this.props.parentContext}
                  name="emptyNationalCode"
                  title="کدملی"
                  readOnly
                  lgCol={12}
                  mdCol={12}
                  initialValue=""
                  externalChangedValue=""
                />
              )}
              {this.props.parentState.inspectorPersonnelCode !== "" && (
                <TextBox
                  context={this.props.parentContext}
                  name="nationalCode"
                  title="کدملی"
                  readOnly
                  lgCol={12}
                  mdCol={12}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <ImageUploader
                context={this.props.parentContext}
                name="signaturePhoto"
                title="امضا"
                lgCol={12}
                mdCol={12}
                required={this.props.parentState.isNew}
                readOnly={this.props.parentState.isReadOnly}
              />
            </div>

            <div className="col-lg-4 col-md-12">
              <CheckBox
                context={this.props.parentContext}
                name="isActive"
                title="فعال"
                required={!this.props.parentState.isReadOnly}
                value={
                  this.props.parentState.isNew
                    ? true
                    : this.props.parentState.isActive
                }
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
          </div>
        </CellContainer>
        <Delimiter />
        <CellContainer lgCol={12} mdCol={12} header="">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <DatePicker
                context={this.props.parentContext}
                name="employementDate"
                title="تاریخ استخدام"
                required={!this.props.parentState.isReadOnly}
                useEpoch
                lgCol={12}
                mdCol={12}
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
          </div>
        </CellContainer>
        <CellContainer lgCol={12} mdCol={12} header="">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <DropDown
                context={this.props.parentContext}
                name="inspectionStatus"
                title="وضعیت بازرس / ارجاع گیرنده"
                options={inspectionStatusOptions()}
                notificationSystem={this.notificationSystem}
                required={!this.props.parentState.isReadOnly}
                lgCol={12}
                mdCol={12}
                changeHandler={(e) => this.props.onChangeInspectionStatus(e)}
                initialValue={inspectionStatus.active}
                disabled={this.props.parentState.isReadOnly}
              />
            </div>
            {this.props.parentState.isVisibleFromDate && (
              <div className="col-lg-3 col-md-12">
                <DatePicker
                  context={this.props.parentContext}
                  name="fromDate"
                  title="از تاریخ"
                  required={
                    this.props.parentState.isVisibleFromDate &&
                    !this.props.parentState.isReadOnly
                  }
                  useEpoch
                  lgCol={12}
                  mdCol={12}
                  disabled={this.props.parentState.isReadOnly}
                />
              </div>
            )}

            {this.props.parentState.isVisibleToDate && (
              <div className="col-lg-3 col-md-12">
                <DatePicker
                  context={this.props.parentContext}
                  name="toDate"
                  title="تا تاریخ"
                  required={
                    this.props.parentState.isVisibleToDate &&
                    !this.props.parentState.isReadOnly
                  }
                  useEpoch
                  lgCol={12}
                  mdCol={12}
                  disabled={this.props.parentState.isReadOnly}
                />
              </div>
            )}
          </div>
        </CellContainer>

        {this.props.parentState.fileList.length > 0 && (
          <>
            <Delimiter />
            <CellContainer lgCol={12} mdCol={12} header="تصاویر ثبت شده">
              <Table
                headers={[
                  {
                    title: "نام فایل",
                    name: "fileName",
                  },
                  {
                    title: "نوع فایل",
                    name: "fileType",
                  },
                ]}
                data={this.props.parentState.fileList}
                removeBodyClass
                minHeightTableWrapper={200}
                rowOptions={[
                  {
                    title: "دانلود فایل",
                    icon: "download",
                    func: (e) => this.props.onDownloadFile(e),
                  },
                ]}
              />
            </CellContainer>
          </>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <TextBox
              context={this.props.parentContext}
              name="address"
              title="آدرس"
              notificationSystem={this.notificationSystem}
              lgCol={12}
              mdCol={12}
              disabled={this.props.parentState.isReadOnly}
            />
          </div>
        </div>
        <Delimiter />
        <CellContainer
          lgCol={12}
          mdCol={12}
          title="تخصیص گروه"
          key={"group" + this.props.parentState.GroupKey}
        >
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <AutoCompleteLookUp
                context={this.props.parentContext}
                name="groupId"
                label="codeTitle"
                value="id"
                title="گروه بازرسی"
                required={!this.props.parentState.isReadOnly}
                disabled={this.props.parentState.isReadOnly}
                key={this.props.parentState.groupUpdateKey}
                changeHandler={(e) => this.props.onChangeGroup(e)}
                autoCompleteApiUrl="/api/cmi/inspectionGroup/searchActiveGroups"
                lookUpApiUrl="/api/cmi/inspectionGroup/GetListForLookUp"
                headers={[
                  { title: "کد گروه", name: "code" },
                  { title: "عنوان گروه", name: "title" },
                ]}
                filterOptions={[
                  {
                    type: "number",
                    name: "code",
                    title: "کد گروه",
                  },
                  {
                    type: "text",
                    name: "title",
                    title: "عنوان گروه",
                  },
                ]}
              />
            </div>

            <div className="col-lg-3 col-md-3">
              <AutoCompleteLookUp
                context={this.props.parentContext}
                name="subGroupId"
                label="codeTitle"
                value="id"
                title="زیرگروه بازرسی"
                required={!this.props.parentState.isReadOnly}
                key={this.props.parentState.subGroupUpdateKey}
                disabled={
                  this.props.parentState.isReadOnly ||
                  this.props.parentState.groupId === "" ||
                  this.props.parentState.groupId === null
                }
                lookUpApiUrl={`/api/cmi/InspectionSubGroup/SearchSubGroupsByGroupIdForLookUp/${this.props.parentState.groupId}`}
                autoCompleteApiUrl={`/api/cmi/InspectionSubGroup/searchSubGroupsByGroupId/${this.props.parentState.groupId}`}
                changeHandler={(e) => this.props.onChangeSubGroup(e)}
                headers={[
                  { title: "کد زیر گروه", name: "code" },
                  { title: "عنوان گروه", name: "title" },
                ]}
                filterOptions={[
                  {
                    type: "number",
                    name: "code",
                    title: "کد زیر گروه",
                  },
                  {
                    type: "text",
                    name: "title",
                    title: "عنوان زیر گروه",
                  },
                ]}
              />
            </div>
          </div>
          <div className="text-end mb-2">
            <Button
              buttonClass={`btn btn-outline-primary btn-sm col-lg-1 ${
                this.props.parentState.isReadOnly ? "d-none" : ""
              }`}
              iconLeftClass={`ti ti-circle-plus me-1`}
              text={`افزودن`}
              onclick={this.props.onAddSubGroup}
            />
          </div>
          <Table
            hasDeleteButton={!this.props.parentState.isReadOnly}
            headers={[
              { title: "گروه بازرسی", name: "groupTitle" },
              { title: "زیرگروه بازرسی", name: "subGroupTitle" },
            ]}
            data={this.props.parentState.subGroupList}
            removeBodyClass
            minHeightTableWrapper={200}
            onDeleteButton={(e) => this.props.onDeleteSubGroup(e)}
            key={"subGroupKey" + this.props.parentState.subGroupUpdateKey}
          />
        </CellContainer>

        <Delimiter style="solid" />

        <div className="row">
          <div className="text-end mb-2 col">
            <Button
              buttonClass={`btn btn-outline-primary col-lg-1.5`}
              iconRightClass={`ti ti-arrow-left ms-1`}
              text={`مرحله بعدی`}
              onclick={() => this.props.onChangeStepNumber(1)}
            />
          </div>
        </div>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}

export default InspectorInfoSection;
