import React, {ReactFragment} from 'react';
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import {readInput, readSpan} from "./string";
import $ from "jquery";

export interface TextProps {
    value: string;
    edit: boolean;
    id: string;
}

class TextField extends React.Component<TextProps, {}> {
    static textTr(id: string, text: string, value: string, edit: boolean): ReactFragment {
        return <tr>
            <td>{text}</td>
            <td><TextField id={id} value={value} edit={edit}/></td>
        </tr>
    }

    render(): ReactFragment {
        return this.props.edit
            ? <input id={this.props.id} className="form-control" type="text" defaultValue={this.props.value}/>
            : <span id={this.props.id}>{this.props.value}</span>;
    }

    static read(id: string): t.TypeOf<primitives.R4.StringType> | undefined {
        console.log("start read id=" + id);
        const propTag = $("#" + id).prop("tagName");
        if (!propTag) return undefined;
        const tag = propTag.toLowerCase();
        switch (tag) {
            case "input":
                return readInput(id);
            case "span":
                return readSpan(id);
            default:
                return undefined;
        }
    }

    static readArray(id: string): t.TypeOf<primitives.R4.StringType>[] | undefined {
        const v = TextField.read(id);
        return v !== undefined ? v.split("\\s+") : undefined;
    }
}

export default TextField;