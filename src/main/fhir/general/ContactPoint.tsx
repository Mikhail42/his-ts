import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import Text from "./../primitive/Text";
import Select from "../primitive/Select";
import Number from "../primitive/Int";
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
}

class TelecomView extends React.Component<TelecomProps, {}> {
    render(): ReactFragment {
        const t = this.props.telecom;
        const i = this.props.i || "";
        const defSystemKey = t.system || "other";
        const edit = this.props.edit;
        const defUseKey = t.use || "mobile";
        return <tr>
            <td><Select id={"telecomSystem" + i} edit={edit} selectMap={telecomSystem} defKey={defSystemKey}/></td>
            <td><Text edit={edit} value={t.value || ""} id={"telecomValue" + i}/></td>
            <td><Number edit={edit} value={t.rank} id={"telecomRank" + i}/></td>
            <td><Select id={"telecomUse" + i} edit={edit} selectMap={telecomUse} defKey={defUseKey}/></td>
            <td><Period period={t.period || {}} edit={edit} idSuffix={"Telecom" + i}/></td>
        </tr>;
    }

    static read(i: number, old?: R4.ContactPoint): R4.ContactPoint {
        const newTelecom: R4.ContactPoint = {
            system: Select.readSelectedKey("telecomSystem" + i, telecomSystem),
            value: Text.read("telecomValue" + i),
            rank: Number.readInt("telecomRank" + i),
            use: Select.readSelectedKey("telecomUse" + i, telecomUse),
            period: Period.read("Telecom" + i)
        };
        return Object.assign(old || {}, newTelecom);
    }
}

export default TelecomView;