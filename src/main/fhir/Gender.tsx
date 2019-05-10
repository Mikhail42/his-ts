import React, {ReactFragment} from 'react';

import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import Select from "./primitive/Select";

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
                <Select id="gender" edit={this.props.edit} selectMap={genderMap} defKey={defKey}/>
            </td>
        </tr>;
    }

    static read(): t.TypeOf<primitives.R4.CodeType> | undefined {
        return Select.readSelectedKey("gender", genderMap);
    }
}

export default GenderView;