import { AlertBox, Card, DropDown, Helpers, ModalHelper, TextBox } from "core";
import React from "react";
import NotificationSystem from "react-notification-system";
import { MaxLengthDescription } from "../../utils/constants";
import { GetUrl, HandleError } from "../../utils/generals";
import { isActiveOptions } from "../../utils/selectOptionUtils";
import { AttachmentSection } from "./attachmentSection";

export class AttachmentModalSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateKey: 1000,
            showModal: true//props.showModal || false,
        };
        this.notificationSystem = React.createRef();
    }

    componentDidMount = () => {
        // Update


        this.setState(
            {
                ...this.props.record,
                updateKey: this.state.updateKey + 1,
                showModal: this.state.showModal,
            }
        );

    };

    render() {
        return (
            <>

                <ModalHelper
                    context={this}
                    open={this.state.showModal}
                    title="جزءیات دانش آموز"
                    buttonClass={`d-none`}
                    buttonIcon={`d-none`}
                    buttonTitle={`d-none`}
                    onClick={() => {
                        //this.onShowDescriptions()

                    }}
                    toggle={() => this.setState({ showModal: false })}
                    size="xl"
                    hideFooter
                    key={this.state.updateKey}
                >
                    <div class="row">
                        <div class="col-md-12">
                            <AttachmentSection
                                record={this.props.record}
                            // cartableId={this.props.cartableId}
                            // onClickClose={this.onClickClose}
                            // parentState={this.state}
                            // parentContext={this}
                            // setParentState={this.setParentState}
                            />
                        </div>
                    </div>
                </ModalHelper>
                <NotificationSystem ref={this.notificationSystem} />
            </>
        );
    }
}
