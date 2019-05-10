import React, {ReactFragment} from 'react';
import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import {readString} from "./string";

export interface SelectViewProps {
    id: string;
    selectMap: { [id: string]: string };
    defKey?: string;
    onSelect?: (key: string) => void;
    edit: boolean;
}

class SelectView extends React.Component<SelectViewProps, {}> {
    render(): ReactFragment {
        const m = this.props.selectMap;
        const defKey = this.props.defKey;
        const defVal = defKey ? m[defKey] : "";
        const onSelect = this.props.onSelect;
        return this.props.edit ? <select defaultValue={defKey}>
            {Object.keys(m).map((key: string) => {
                return <option value={key} onSelect={() => onSelect && onSelect(key)}>
                    {m[key]}
                </option>
            })}
        </select>
            : <span id={this.props.id}>{defVal}</span>;
    }

    static readSelectedKey(id: string, selectMap: { [id: string]: string }): t.TypeOf<primitives.R4.CodeType> | undefined {
        // @ts-ignore
        const selectedVal = readString(id);
        return Object.keys(selectMap).find((key: string) => {
            return selectMap[key] === selectedVal;
        });
    }
}

export default SelectView;