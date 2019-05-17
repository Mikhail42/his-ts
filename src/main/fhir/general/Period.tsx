import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import DateField from "../primitive/DateField";

export interface PeriodProps {
    period: R4.Period;
    edit: boolean;
    idSuffix: string;
}

class PeriodView extends React.Component<PeriodProps, {}> {
    render(): ReactFragment {
        const edit = this.props.edit;
        const period = this.props.period;
        const suffix = this.props.idSuffix;
        return <span>
            {(period.start || edit) && <span>c <DateField id={"startDate" + suffix} edit={edit} date={period.start}/> </span>}
            {(period.end || edit) && <span>по <DateField id={"endDate" + suffix}  edit={edit} date={period.end}/></span>}
        </span>;
    }

    static read(idSuffix: string, old?: R4.Period): R4.Period {
        const newPeriod: R4.Period = {
            start: DateField.readAsIso8601("startDate" + idSuffix),
            end: DateField.readAsIso8601("endDate" + idSuffix)
        };
        return Object.assign(old || {}, newPeriod);
    }
}

export default PeriodView;