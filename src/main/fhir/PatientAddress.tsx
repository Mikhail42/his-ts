import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import PatientBlock, {PatientBlockProps, PatientBlockState} from "./util/PatientBlock";
import Address from "./general/Address";

export interface PatientAddressProps extends PatientBlockProps {
    address: R4.Address[]
}

export interface PatientAddressState extends PatientBlockState {
}

class PatientAddressView extends PatientBlock<PatientAddressProps, PatientAddressState> {
    constructor(props: PatientAddressProps) {
        super(props);
        this.state = {
            edit: this.props.edit
        };
    }

    render(): ReactFragment {
        const a = this.props.address[0]; // TODO
        return <div className="patient-address">
            {this.blockTitle("Адрес")}
            <Address address={a} edit={this.state.edit} />
        </div>;
    }

    static read(old?: R4.Address[]): R4.Address[] {
        const a = (old && old.length) ? old[0] : undefined;
        return [Address.read(a)];
    }
}

export default PatientAddressView;