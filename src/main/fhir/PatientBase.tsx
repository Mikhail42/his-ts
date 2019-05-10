import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import PatientBlock, {PatientBlockProps, PatientBlockState} from "./util/PatientBlock";
import HumanName from "./general/HumanName";
import {humanName} from "./general/name";
import Gender from "./Gender";
import BirthDate from "./BirthDate";
import {formatDate, iso8601DateFormat} from "./primitive/date";

export interface PatientViewProps extends PatientBlockProps {
    patient: R4.Patient;
}

export interface PatientBaseState extends PatientBlockState {
}

class PatientBaseView extends PatientBlock<PatientViewProps, PatientBaseState> {
    constructor(props: PatientViewProps) {
        super(props);
        this.state = {
            edit: this.props.edit
        };
    }

    render(): ReactFragment {
        const p = this.props.patient;
        const name = humanName(p);
        return <div className="patient-base">
            {this.blockTitle("Основное")}
            <table className="patient-base">
                <tbody className="block-table-body">
                    <HumanName humanName={name} edit={this.state.edit}/>
                    <BirthDate birthDate={p.birthDate} edit={this.state.edit}/>
                    <Gender sex={p.gender} edit={this.state.edit}/>
                </tbody>
            </table>
        </div>;
    }

    static readBase(old?: R4.Patient): R4.Patient {
        const p: R4.Patient = {};
        p.name = [HumanName.read(humanName(p))];
        p.birthDate = BirthDate.readAsIso8601();
        p.gender = Gender.read();
        return Object.assign(old || {}, p);
    }
}

export default PatientBaseView;