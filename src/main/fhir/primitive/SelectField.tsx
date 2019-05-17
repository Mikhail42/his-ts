import React, {ReactFragment} from 'react';
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import $ from "jquery";
import {readSelect, readSpan} from "./string";

export interface SelectViewProps {
    id: string;
    selectMap: { [id: string]: string };
    defKey?: string;
    onSelect?: (key: string) => void;
    edit: boolean;
}

class SelectField extends React.Component<SelectViewProps, {}> {
    render(): ReactFragment {
        const m = this.props.selectMap;
        const defKey = this.props.defKey;
        const defVal = defKey ? m[defKey] : "";
        const onSelect = this.props.onSelect;
        return this.props.edit ? <select id={this.props.id} defaultValue={defKey}>
            {Object.keys(m).map((key: string) => {
                return <option value={key} onSelect={() => onSelect && onSelect(key)}>
                    {m[key]}
                </option>
            })}
        </select>
            : <span id={this.props.id}>{defVal}</span>;
    }

    static readSelectedKey(id: string, selectMap: { [id: string]: string }): t.TypeOf<primitives.R4.CodeType> | undefined {
        console.log("start read id=" + id);
        const propTag = $("#" + id).prop("tagName");
        if (!propTag) return undefined;
        const tag = propTag.toLowerCase();
        switch (tag) {
            case "select":
                return readSelect(id);
            case "span":
                const selectedVal = readSpan(id);
                return Object.keys(selectMap).find((key: string) => {
                    return selectMap[key] === selectedVal;
                });
            default:
                return undefined;
        }
    }
}

export default SelectField;