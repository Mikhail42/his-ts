import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import Telecom from "./ContactPoint";
import TelecomView from "./ContactPoint";

export interface TelecomProps {
    telecoms: R4.ContactPoint[];
    edit: boolean;
}

export interface TelecomState {
    telecoms: R4.ContactPoint[];
}

class ContactPointListView extends React.Component<TelecomProps, TelecomState> {
    constructor(props: TelecomProps) {
        super(props);
        this.state = {
            telecoms: this.props.telecoms
        }
    }

    render(): ReactFragment {
        const edit = this.props.edit;
        return <>
            <table className="telecom-list">
                <tbody className="block-table-body">
                    <tr>
                        <th>Тип</th><th>Значение</th><th>Приоритет</th><th>Использование</th><th>Период</th>
                    </tr>
                    {this.props.telecoms.map((t:  R4.ContactPoint, i: number) => {
                        const _this = this;
                        return <Telecom key={i} telecom={t} edit={edit} i={i} remove={() => _this.remove(t)}/>;
                    })}
                </tbody>
            </table>
            {edit ? <span className="add-item">
                <button onClick={this.addNew.bind(this)}>Добавить</button>
            </span> : <span/>}
        </>;
    }

    addNew(): void {
        const ts = this.state.telecoms;
        ts.push({});
        this.setState({
            telecoms: ts
        });
    }

    remove(t: R4.ContactPoint): void {
        let ts = this.state.telecoms;
        this.setState({
            telecoms: ts.filter(item => item !== t)
        });
    }

    static read(): R4.ContactPoint[] {
        const contacts: R4.ContactPoint[] = [];
        let i = 0; // TODO: I can remove zero's contact point
        let flag = true;
        while (flag) {
            try {
                const t = Telecom.read(i);
                flag = !TelecomView.isEmpty(t);
                if (flag) contacts.push(t || {});
                i += 1;
            } catch (exc) {
                flag = false;
            }
        }
        return contacts;
    }
}

export default ContactPointListView;