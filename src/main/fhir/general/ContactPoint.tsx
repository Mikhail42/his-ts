import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import TextField from "../primitive/TextField";
import SelectField from "../primitive/SelectField";
import IntField from "../primitive/IntField";
import Period from "./Period";

const telecomSystem: { [id: string]: string } = {
    phone: "Телефон",
    email: "Эл. почта",
    url: "Сайт",
    sms: "SMS",
    fax: "Факс",
    pager: "Пейджер",
    other: "Другое"
};

const telecomUse: { [id: string]: string } = {
    mobile: "Мобильный",
    home: "Домашний",
    work: "Рабочий",
    temp: "Временный",
    old: "Устаревший"
};

export interface TelecomProps {
    telecom: R4.ContactPoint;
    edit: boolean;
    i: number | undefined;
    remove: () => void;
}

class TelecomView extends React.Component<TelecomProps, {}> {
    render(): ReactFragment {
        const t = this.props.telecom;
        const i = this.props.i;
        const defSystemKey = t.system || "other";
        const edit = this.props.edit;
        const defUseKey = t.use || "mobile";
        return <tr>
            <td><SelectField id={"telecomSystem" + i} edit={edit} selectMap={telecomSystem} defKey={defSystemKey}/></td>
            <td><TextField edit={edit} value={t.value || ""} id={"telecomValue" + i}/></td>
            <td><IntField edit={edit} value={t.rank} id={"telecomRank" + i}/></td>
            <td><SelectField id={"telecomUse" + i} edit={edit} selectMap={telecomUse} defKey={defUseKey}/></td>
            <td><Period period={t.period || {}} edit={edit} idSuffix={"Telecom" + i}/></td>
            {edit && <td><button onClick={this.props.remove}>Удалить</button></td>}
        </tr>;
    }

    static isEmpty(t: R4.ContactPoint | undefined): boolean {
        return !(t && (t.use || t.rank || t.system || t.value || t.id || (t.period && (t.period.start || t.period.end))));
    }

    static read(i: number, old?: R4.ContactPoint): R4.ContactPoint | undefined {
        const newTelecom: R4.ContactPoint = {
            system: SelectField.readSelectedKey("telecomSystem" + i, telecomSystem),
            value: TextField.read("telecomValue" + i),
            rank: IntField.readInt("telecomRank" + i),
            use: SelectField.readSelectedKey("telecomUse" + i, telecomUse),
            period: Period.read("Telecom" + i)
        };
        if (TelecomView.isEmpty(newTelecom)) return undefined;
        return Object.assign(old || {}, newTelecom);
    }
}

export default TelecomView;