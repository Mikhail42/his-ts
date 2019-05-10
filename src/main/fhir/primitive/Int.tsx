import React, {ReactFragment} from 'react';
import $ from "jquery";
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";

export interface IntProps {
    value: t.TypeOf<primitives.R4.IntegerType> | undefined;
    edit: boolean;
    id: string;
}

class IntView extends React.Component<IntProps, {}> {
    static intTr(id: string, number: number, value: number | undefined, edit: boolean): ReactFragment {
        return <tr>
            <td>{number}</td>
            <td><IntView id={id} value={value} edit={edit}/></td>
        </tr>
    }

    render(): ReactFragment {
        const v = this.props.value;
        const def = (v !== null && v !== undefined) ? v.toString() : "";
        return this.props.edit
            ? <input className="form-control number" type="text" pattern="[0-9]*" defaultValue={def} min={1}/>
            : <span id={this.props.id}>{def}</span>;
    }

    static readInt(id: string): t.TypeOf<primitives.R4.IntegerType> | undefined {
        const val = $("#" + id).val();
        return (val !== undefined) ? parseInt(val.toString().trim()) : undefined;
    }
}

export default IntView;