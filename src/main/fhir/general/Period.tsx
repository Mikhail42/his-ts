import React, {ReactFragment} from 'react';

import {R4} from "@tangdrew/fhir-types";
import DateView from "../primitive/Date";

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
            {(period.start || edit) && <span>c <DateView id={"startDate" + suffix} edit={edit} date={period.start}/> </span>}
            {(period.end || edit) && <span>по <DateView id={"endDate" + suffix}  edit={edit} date={period.end}/></span>}
        </span>;
    }

    static read(idSuffix: string, old?: R4.Period): R4.Period {
        const newPeriod: R4.Period = {
            start: DateView.readAsIso8601("startDate" + idSuffix),
            end: DateView.readAsIso8601("startDate" + idSuffix)
        };
        return Object.assign(old || {}, newPeriod);
    }
}

export default PeriodView;