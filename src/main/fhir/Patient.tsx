import React, {ReactFragment} from 'react';

import $ from "jquery";

import {R4} from "@tangdrew/fhir-types";
import PatientAddress from "./PatientAddress";
import PatientBase from "./PatientBase";
import {humanNameAsString} from "./general/name";
import PatientTelecom from "./PatientTelecom";

export interface PatientViewProps {
    patient: R4.Patient
    edit: boolean
}

class PatientView extends React.Component<PatientViewProps, {}> {
    constructor(props: any) {
        super(props);
        this.save = this.save.bind(this);
    }

    render(): ReactFragment {
        const p = this.props.patient;
        const edit = this.props.edit;
        document.title = humanNameAsString(p);
        return <div className="patient">
            <PatientBase patient={p} edit={edit} save={this.save}/>
            <PatientAddress address={p.address || [{line: []}]} edit={edit} save={this.save}/>
            <PatientTelecom telecoms={this.props.patient.telecom || []} edit={edit} save={this.save}/>
        </div>;
    }

    private save(): JQuery.Promise<R4.Patient> {
        const def = $.Deferred<R4.Patient>();
        const data = PatientView.read(this.props.patient);
        // TODO: send REST request with patient's data
        def.resolve(data);
        return def.promise();
    }

    static read(old?: R4.Patient): R4.Patient {
        return Object.assign(
            old || {},
            PatientBase.readBase(old),
            {telecom: PatientTelecom.read()},
            {address: PatientAddress.read()}
        );
    }
}

export default PatientView;