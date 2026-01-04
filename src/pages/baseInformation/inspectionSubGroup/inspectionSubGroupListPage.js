import { PageMain, SimpleGrid } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MinGridHeight } from "../../../utils/constants";
import { GetUrl, HandleError } from "../../../utils/generals";
import { isActiveOptions } from "../../../utils/selectOptionUtils";

export default class InspectionSubGroupListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnitsModal: false,
      id: "",
    };
    this.pageInfo = {
      title: "فهرست زیر گروه های بازرسی",
      icon: "list-search",
    };
    this.notificationSystem = React.createRef();
  }

  render() {
    return (
      <>
        <PageMain
          title={this.pageInfo.title}
          icon={this.pageInfo.icon}
          topButtons={[
            {
              title: "افزودن زیر گروه بازرسی",
              url: GetUrl("inspectionSubGroupAddPage"),
              color: "outline-primary",
              icon: "circle-plus",
            },
          ]}
          footerLinks={[{ href: "/", text: "صفحه اصلی" }]}
        >
          <div className="card">
            <div className="card-body">
              <SimpleGrid
                hideExportButton
                context={this}
                dataKey="id"
                minHeightTableWrapper={MinGridHeight}
                filterBgColor="primary"
                name="gridInspectionSubGroupListPage"
                title="فهرست"
                listApiUrl="/api/cmi/InspectionSubGroup/GetList"
                deleteApiUrl="/api/cmi/InspectionSubGroup/Delete"
                onDeleteErrorFunc={(error) =>
                  HandleError(this.notificationSystem, error)
                }
                editPageUrl={GetUrl("inspectionSubGroupEditPage")}
                isFilterCollapsed={true}
                enableAutoFetch={true}
                notificationSystem={this.notificationSystem}
                headers={[
                  { title: "کد", name: "id" },
                  { title: "عنوان", name: "title" },
                  { title: "گروه بازرسی", name: "inspectionGroupTitle" },
                  { title: "وضعیت", name: "isActiveTitle" },
                  {
                    title: "تاریخ غیرفعال سازی",
                    name: "deactivationDateShamsi",
                  },
                  { title: "شرح", name: "description" },
                ]}
                filterOptions={[
                  {
                    type: "number",
                    name: "id",
                    title: "کد",
                  },
                  {
                    type: "text",
                    name: "title",
                    title: "عنوان",
                  },
                  {
                    type: "auto-complete",
                    name: "inspectionGroupId",
                    title: "گروه بازرسی",
                    lookupApiUrl:
                      "/api/cmi/InspectionGroup/GetAllForAutoComplete",
                  },
                  {
                    type: "select",
                    name: "isActive",
                    title: "وضعیت",
                    selectOptions: isActiveOptions(),
                  },
                ]}
              />
            </div>
          </div>
        </PageMain>
        <NotificationSystem ref={this.notificationSystem} />
      </>
    );
  }
}
