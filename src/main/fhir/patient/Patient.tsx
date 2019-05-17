import React, {ReactFragment} from 'react';

import $ from "jquery";

import {R4} from "@tangdrew/fhir-types";
import PatientAddress from "./PatientAddress";
import PatientBase from "./PatientBase";
import {humanNameAsString} from "../general/name";
import PatientTelecom from "./PatientTelecom";

export interface PatientProps {
    patient: R4.Patient;
    edit: boolean;
}

export interface PatientState {
    patient: R4.Patient;
    edit: boolean;
}

class PatientView extends React.Component<PatientProps, PatientState> {
    constructor(props: PatientProps) {
        super(props);
        this.state = {
            patient: this.props.patient,
            edit: this.props.edit
        };
        this.save = this.save.bind(this);
    }

    render(): ReactFragment {
        const p = this.state.patient;
        const edit = this.state.edit;
        document.title = humanNameAsString(p);
        return <div className="patient">
            <PatientBase patient={p} edit={edit} save={this.save}/>
            <PatientAddress address={p.address || [{}]} edit={edit} save={this.save}/>
            <PatientTelecom telecoms={p.telecom || []} edit={edit} save={this.save}/>
        </div>;
    }

    private save(): JQuery.Promise<R4.Patient> {
        const def = $.Deferred<R4.Patient>();
        console.log("Start save");
        const patient: R4.Patient = PatientView.read(this.props.patient);
        console.log("patient is");
        console.log(patient);
        this.setState({
            patient: patient,
            edit: false
        });
        console.log("Save state successfully");
        // TODO: send REST request with patient's data
        def.resolve(patient);
        return def.promise();
    }

    static read(old?: R4.Patient): R4.Patient {
        console.log("start read patient");
        return Object.assign(
            old || {},
            PatientBase.readBase(old),
            {telecom: PatientTelecom.read()},
            {address: PatientAddress.read()}
        );
    }
}

export default PatientView;