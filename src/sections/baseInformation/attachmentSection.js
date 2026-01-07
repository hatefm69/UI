import { AlertBox, Card, CellContainer, DropDown, Helpers, Table, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import { GetUrl, HandleError } from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";
import TableHeader from "../../utils/tableHeader";

export class AttachmentSection extends React.Component {
    constructor(props) {
        super(props);
        // this.id = this.props.match.params.id;
        this.state = {
            record: this.props.record,
            updateKey: 1000,
            attachmentsTableData: []
        };
        this.notificationSystem = React.createRef();
    }

    componentDidMount = () => {
        // Update
        this.getAttachments();
        this.setState(
            {
                ...this.props.record,
                updateKey: this.state.updateKey + 1,
                showModal: true,
            }
        );

    };


    onDownloadFile = (e) => {
        window.open(
            '/api/cmi/Attachment/Download/' + e.filter(x => x.name === 'id')[0].value,
            '_blank'
        );
    };


    onDeleteAttachment = (e) => {
        console.log(e);
        Helpers.CallServer(
            "/api/cmi/Attachment/DeleteAttachmentWithAttachmentId/" + `${e.modalData.filter(x => x.name === 'id')[0].value}`,
            {
                // studentId: this.props.record,
            },
            (response) => {
                this.getAttachments();
            },
            (error) => HandleError(this.notificationSystem, error),
            () => this.setState({ isLoading: false, updateKey: this.state.updateKey + 1, }),
            "POST"
        );
    }

    getAttachments = () => {
        Helpers.CallServer(
            "/api/cmi/Attachment/GetList/" + `${this.state.record}`,
            {
                // studentId: this.props.record,
            },
            (response) => {
                this.setState({
                    attachmentsTableData: response,//.map(x => ({ value: x.id, label: x.fileName, title: x.fileName })),
                    updateKey: this.state.updateKey + 1,
                });
            },
            (error) => HandleError(this.notificationSystem, error),
            () => this.setState({ isLoading: false }),
            "POST"
        );
    }

    render() {
        return (
            <>

                <CellContainer
                    lgCol={12}
                    mdCol={12}
                    updateKey={this.state.updateKey}
                    borderRightColor='info'
                    style={{
                        background: 'white',
                    }}
                >
                    <Table
                        hasDeleteButton={true}
                        key={"table" + this.state.updateKey}
                        onDeleteButton={(e) => this.onDeleteAttachment(e)}
                        data={this.state.attachmentsTableData}
                        minHeightTableWrapper={250}
                        headers={[
                            new TableHeader("fileName", "نام فایل"),
                        ]}
                        rowOptions={[
                            {
                                title: "دانلود",
                                icon: "download",
                                func: (e) => this.onDownloadFile(e),
                            },
                        ]}
                    // tableClassName={
                    //   !this.isNew && this.props.item != null && this.props.isChange
                    //     ? this.props.item.isChangeInstruction
                    //       ? "   border border-danger"
                    //       : ""
                    //     : ""
                    // }
                    />
                    {/* <div class='row'>
                        با توجه به نقاط ضعف ذکر شده در بندهای گزارش و ارزیابی ریسک صورت
                        پذیرفته، نظر اداره کل حسابرسی داخلی از وضعیت سیستم کنترل های داخلی
                        فرآیند به صورت ذیل ارزیابی می گردد:
                     
                    </div> */}
                    {/* </Card> */}
                </CellContainer>
                <NotificationSystem ref={this.notificationSystem} />
            </>
        );
    }
}
