import React, {ReactFragment} from 'react';
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import {readArrayString, readString} from "./string";

export interface TextProps {
    value: string;
    edit: boolean;
    id: string;
}

class TextView extends React.Component<TextProps, {}> {
    static textTr(id: string, text: string, value: string, edit: boolean): ReactFragment {
        return <tr>
            <td>{text}</td>
            <td><TextView id={id} value={value} edit={edit}/></td>
        </tr>
    }

    render(): ReactFragment {
        return this.props.edit
            ? <input className="form-control" type="text" defaultValue={this.props.value}/>
            : <span id={this.props.id}>{this.props.value}</span>;
    }

    static read(id: string): t.TypeOf<primitives.R4.StringType> {
        return readString(id);
    }

    static readArray(id: string): t.TypeOf<primitives.R4.StringType>[] {
        return readArrayString(id);
    }
}

export default TextView;