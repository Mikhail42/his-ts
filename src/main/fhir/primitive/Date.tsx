import React, {ReactFragment} from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import {defaultDateFormat, parseDate, formatDate, isValid, iso8601DateFormat} from "./date";

import ru from 'date-fns/locale/ru';
import $ from "jquery";
registerLocale('ru', ru);

export interface DateProps {
    id: string;
    date: t.TypeOf<primitives.R4.DateType> | undefined;
    edit: boolean;
    format?: string;
    afterDate?: string;
}

export interface DateState {
    date: Date
}

class DateView extends React.Component<DateProps, DateState> {
    constructor(props: DateProps) {
        super(props);
        const date = this.props.date ? new Date(this.props.date) : new Date(NaN);
        this.state = {
            date: date
        };
    }

    updateDate(date: Date): void {
        this.setState({
            date: date
        });
    }

    render(): ReactFragment {
        const afterDate = this.props.afterDate || "";
        return this.props.edit ? (
            <DatePicker selected={this.isValid() ? this.state.date : null}
                        onChange={this.updateDate.bind(this)} isClearable={true}
                        locale="ru" showYearDropdown showMonthDropdown maxDate={new Date()}
                        dateFormat={this.props.format || defaultDateFormat}/>
         ) : <>
            <span id={this.props.id}>{this.isValid() ? formatDate(this.state.date, this.props.format) : ""}</span>
            <span>{this.isValid() ? afterDate : ""}</span>
        </>;
    }

    private isValid(): boolean {
        return isValid(this.state.date);
    }

    static read(id: string, format?: string): Date | undefined {
        const val = $("#" + id).val();
        if (val !== undefined) {
            const date = parseDate(val.toString().trim(), format);
            return isValid(date) ? date : undefined;
        } else {
            return undefined;
        }
    }

    static readAsIso8601(id: string, format?: string): t.TypeOf<primitives.R4.DateType> | undefined {
        const date = DateView.read(id, format);
        return date ? formatDate(date, iso8601DateFormat) : undefined;
    }
}

export default DateView;