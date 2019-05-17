import React, {ReactFragment} from 'react';

import "react-datepicker/dist/react-datepicker.css";

import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import DateField from "./primitive/DateField";
import {ageText, isValid} from "./primitive/date";

export interface BirthDateProps {
    birthDate: t.TypeOf<primitives.R4.DateType> | undefined;
    edit: boolean;
}

class BirthDateView extends React.Component<BirthDateProps, {}> {
    render(): ReactFragment {
        const birthDateStr = this.props.birthDate;
        const birthDate = birthDateStr ? new Date(birthDateStr) : undefined;
        const age = birthDate && isValid(birthDate) ? ageText(birthDate) : "";
        return <tr>
            <td>Дата рождения</td>
            <td>
                <DateField id="birthDate" edit={this.props.edit} date={birthDateStr} afterDate={birthDate ? " (" + age + ")" : ""}/>
            </td>
        </tr>;
    }

    static read(format?: string): Date | undefined {
       return DateField.read("birthDate", format);
    }

    static readAsIso8601(format?: string): t.TypeOf<primitives.R4.DateType> | undefined {
        return DateField.readAsIso8601("birthDate", format);
    }
}

export default BirthDateView;