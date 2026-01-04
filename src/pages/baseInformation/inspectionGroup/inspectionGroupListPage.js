import { PageMain, SimpleGrid } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MinGridHeight } from "../../../utils/constants";
import { GetUrl, HandleError } from "../../../utils/generals";
import { isActiveOptions } from "../../../utils/selectOptionUtils";

export default class InspectionGroupListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnitsModal: false,
      id: "",
    };
    this.pageInfo = {
      title: "فهرست گروه های بازرسی",
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
              title: "افزودن گروه بازرسی",
              url: GetUrl("inspectionGroupAddPage"),
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
                name="gridInspectionGroupListPage"
                title="فهرست"
                listApiUrl="/api/cmi/InspectionGroup/GetList"
                deleteApiUrl="/api/cmi/InspectionGroup/Delete"
                onDeleteErrorFunc={(error) =>
                  HandleError(this.notificationSystem, error)
                }
                editPageUrl={GetUrl("InspectionGroupEditPage")}
                isFilterCollapsed={true}
                enableAutoFetch={true}
                notificationSystem={this.notificationSystem}
                headers={[
                  { title: "کد", name: "id" },
                  { title: "عنوان", name: "title" },
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
