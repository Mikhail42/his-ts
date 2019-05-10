import React, {ReactFragment} from 'react';
import EditSection from "./EditSection";
import {R4} from "@tangdrew/fhir-types";

export interface PatientBlockProps {
    edit: boolean;
    save: () => JQuery.Promise<R4.Patient>;
}

export interface PatientBlockState {
    edit: boolean;
}

class PatientBlockView<Props extends PatientBlockProps, State extends PatientBlockState> extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    blockTitle(title: string): ReactFragment {
        return <>
            <span className="section-title">{title}</span>
            <EditSection edit={this.state.edit} onEditClick={this.onEditClick} onSaveClick={this.onSaveClick}/>
            </>
    }

    onEditClick(): void {
        this.setState(prevState => ({
            ...prevState, // TODO
            edit: true
        }));
    }

    onSaveClick(): void {
        this.props.save().then((p: R4.Patient) => {
            this.setState(prevState => ({
                ...prevState, // TODO
                edit: false
            }));
        }, function (err) {
            console.error(err);
        });
    }
}

export default PatientBlockView;