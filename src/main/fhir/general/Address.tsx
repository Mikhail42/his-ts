import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import {mkString, asString} from "../primitive/string";
import Text from "../primitive/Text";
import Select from "../primitive/Select";
import Period from "./Period";

export interface AddressProps {
    address: R4.Address;
    edit: boolean;
}

const addressUse: { [id: string]: string } = {
    home: "Дом",
    work: "Работа",
    temp: "Временный",
    old: "Бывшый",
    billing: "Оформляется"
};

class AddressView extends React.Component<AddressProps, {}> {
    textTr(id: string, text: string, value: string): ReactFragment {
        return Text.textTr(id, text, value, this.props.edit);
    }

    render(): ReactFragment {
        const a = this.props.address;
        const edit = this.props.edit;
        const defUseKey = a.use || "home";
        return <div className="address">
            <table className="address">
                <tbody className="block-table-body">
                    <tr>
                        <td>Тип</td>
                        <td><Select id="addressUse" edit={edit} selectMap={addressUse} defKey={defUseKey}/></td>
                    </tr>
                    {this.textTr("addressLine", "Улица, дом", mkString(a.line))}
                    {this.textTr("addressCity", "Город, село", asString(a.city))}
                    {(a.district || edit) && this.textTr("addressDistrict", "Район", asString(a.district))}
                    {this.textTr("addressState", "Регион", asString(a.state))}
                    {(a.country || edit) && this.textTr("addressCountry", "Страна", asString(a.country))}
                    <tr>
                        <td>Период</td>
                        <td><Period period={a.period || {}} edit={edit} idSuffix={"address"}/></td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }

    static read(old?: R4.Address): R4.Address {
        const newAddress: R4.Address = {
            use: Select.readSelectedKey("addressUse", addressUse),
            line: Text.readArray("addressLine"),
            city: Text.read("addressCity"),
            district: Text.read("addressDistrict"),
            country: Text.read("addressCountry"),
            period: Period.read("address")
        };
        return Object.assign(old || {}, newAddress);
    }
}

export default AddressView;