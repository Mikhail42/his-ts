import React, {ReactFragment} from 'react';
import $ from "jquery";
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import {readInput, readSpan} from "./string";

export interface IntProps {
    value: t.TypeOf<primitives.R4.IntegerType> | undefined;
    edit: boolean;
    id: string;
}

class IntField extends React.Component<IntProps, {}> {
    static intTr(id: string, number: number, value: number | undefined, edit: boolean): ReactFragment {
        return <tr>
            <td>{number}</td>
            <td><IntField id={id} value={value} edit={edit}/></td>
        </tr>
    }

    render(): ReactFragment {
        const v = this.props.value;
        const def = (v !== null && v !== undefined && !isNaN(v)) ? v.toString() : "";
        return this.props.edit
            ? <input id={this.props.id} className="form-control number" type="text" pattern="[0-9]*" defaultValue={def} min={1}/>
            : <span id={this.props.id}>{def}</span>;
    }

    static readInt(id: string): t.TypeOf<primitives.R4.IntegerType> | undefined {
        console.log("start read id=" + id);
        const propTag = $("#" + id).prop("tagName");
        if (!propTag) return undefined;
        const tag = propTag.toLowerCase();
        let str = undefined;
        switch (tag) {
            case "input":
                str = readInput(id);
                break;
            case "span":
                str = readSpan(id);
                break;
            default:
                return undefined;
        }
        return (str !== undefined) ? parseInt(str.trim()) : undefined;
    }
}

export default IntField;