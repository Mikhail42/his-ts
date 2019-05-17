import React, {ReactFragment} from 'react';

import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import SelectField from "./primitive/SelectField";

export interface GenderViewProps {
    sex: t.TypeOf<primitives.R4.CodeType> | undefined;
    edit: boolean;
}

const genderMap: { [id: string]: string } = {
    unknown: "Не выбран",
    male: "Муж.",
    woman: "Жен.",
    other: "Другой"
};

class GenderView extends React.Component<GenderViewProps, {}> {
    render(): ReactFragment {
        const defKey = this.props.sex || genderMap.unknown;
        return <tr>
            <td>Пол</td>
            <td>
                <SelectField id="gender" edit={this.props.edit} selectMap={genderMap} defKey={defKey}/>
            </td>
        </tr>;
    }

    static read(): t.TypeOf<primitives.R4.CodeType> | undefined {
        return SelectField.readSelectedKey("gender", genderMap);
    }
}

export default GenderView;