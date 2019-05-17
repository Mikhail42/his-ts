import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import {mkString, asString} from "../primitive/string";
import TextField from "../primitive/TextField";

export interface HumanNameViewProps {
    humanName: R4.HumanName;
    edit: boolean;
}

class HumanNameView extends React.Component<HumanNameViewProps, {}> {
    render(): ReactFragment {
        const defFamily = asString(this.props.humanName.family);
        const defGiven = mkString(this.props.humanName.given);
        return <>
            <tr>
                <td>Фамилия</td>
                <td><TextField id="family" value={defFamily} edit={this.props.edit}/></td>
            </tr>
            <tr>
                <td>Имя, отчество</td>
                <td><TextField id="given" value={defGiven} edit={this.props.edit}/></td>
            </tr>
        </>;
    }

    static read(old: R4.HumanName | undefined): R4.HumanName {
        console.log("start read human name");
        const newName: R4.HumanName = {
            given: TextField.readArray("given"),
            family: TextField.read("family")
        };
        return Object.assign(old || {}, newName);
    }
}

export default HumanNameView;