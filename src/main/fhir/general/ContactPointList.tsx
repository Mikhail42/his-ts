import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import Telecom from "./ContactPoint";

export interface TelecomProps {
    telecoms: R4.ContactPoint[];
    edit: boolean;
}

class ContactPointListView extends React.Component<TelecomProps, {}> {
    render(): ReactFragment {
        return <table className="telecom-list">
                <tbody className="block-table-body">
                    <tr>
                        <th>Тип</th><th>Значение</th><th>Приоритет</th><th>Использование</th><th>Период</th>
                    </tr>
                    {this.props.telecoms.map((t:  R4.ContactPoint, i: number) => {
                        return <Telecom telecom={t} edit={this.props.edit} i={i}/>;
                    })}
                </tbody>
        </table>;
    }

    static read(): R4.ContactPoint[] {
        const contacts: R4.ContactPoint[] = [];
        let i = 0;
        let flag = true;
        while (flag) {
            try {
                contacts.push(Telecom.read(i));
                i += 1;
            } catch (e) {
                flag = false;
            }
        }
        return contacts;
    }
}

export default ContactPointListView;