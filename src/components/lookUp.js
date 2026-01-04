import React from "react";
import { ModalHelper, SimpleGrid } from "core";
import NotificationSystem from "react-notification-system";
import Button from "../components/button";

export default class LookUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSettingModal: false,
    };

    this.notificationSystem = React.createRef();
  }
  onCloseModal() {
    this.setState({
      isSettingModal: false,
    });
  }
  openModal() {
    this.setState({
      isSettingModal: true,
    });
  }
  onRecordSelect(e) {
    this.props.onRecordSelect(e);
    this.onCloseModal();
  }
  render() {
    return (
      <>
        <div className="form-group">
          <label className="form-label" style={{ color: "white" }}>
            *
          </label>
          <div className="css-1hf1o2u-container">
            <Button
              buttonClass={`btn btn-outline-info   mt-3`}
              iconRightClass={`ti ti-search`}
              text=" "
              onclick={() => this.openModal()}
              style={this.props.style}
            />
          </div>
          <div className="invalid-feedback d-block"></div>
        </div>

        <ModalHelper
          context={this}
          open={this.state.isSettingModal}
          title={this.props.title}
          toggle={(e) => this.onCloseModal(e)}
          hideFooter
          size="xl"
          buttonTitle=""
        >
          <SimpleGrid
            context={this}
            isFilterCollapsed={true}
            minHeightTableWrapper={250}
            filterBgColor="primary"
            name="grid"
            title="رکورد مورد نظر انتخاب کنید"
            enableAutoFetch={true}
            hideExportButton={true}
            notificationSystem={this.notificationSystem}
            listApiUrl={this.props.apiUrl}
            headers={this.props.headers}
            filterOptions={this.props.filterOptions}
            moreInfoLinks={[
              {
                title: "انتخاب",
                icon: "select",
                url: "",
                func: (e) => this.onRecordSelect(e),
                style: "text-primary",
              },
            ]}
          />
          <hr className="hr hr-blurry" />
          <div className="row">
            <div className="text-end mb-2 col">
              <Button
                buttonClass={`btn btn-outline-info pt-2 mt-3`}
                iconRightClass={`ti ti-close-left`}
                text="بستن"
                onclick={() => this.onCloseModal()}
              />
            </div>
          </div>
        </ModalHelper>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
