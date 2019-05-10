import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import PatientBlock, {PatientBlockProps, PatientBlockState} from "./util/PatientBlock";
import ContactPointList from "./general/ContactPointList";

export interface TelecomProps extends PatientBlockProps {
    telecoms: R4.ContactPoint[];
}

export interface TelecomState extends PatientBlockState {
    telecoms: R4.ContactPoint[];
}

class TelecomListView extends PatientBlock<TelecomProps, TelecomState> {
    constructor(props: TelecomProps) {
        super(props);
        this.state = {
            telecoms: this.props.telecoms,
            edit: this.props.edit
        }
    }

    render(): ReactFragment {
        return <div className="patient-telecom-list">
            {this.blockTitle("Контакты")}
            <ContactPointList edit={this.state.edit} telecoms={this.props.telecoms}/>
        </div>;
    }

    static read(): R4.ContactPoint[] {
        return ContactPointList.read();
    }
}

export default TelecomListView;