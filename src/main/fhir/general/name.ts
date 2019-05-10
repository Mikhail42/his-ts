import {R4} from "@tangdrew/fhir-types";
import {mkString, asString} from "../primitive/string";

export function humanName(p: R4.Patient): R4.HumanName {
    return (p.name && p.name[0]) || {given: []};
}

export function humanNameAsString(p: R4.Patient): string {
    const n = humanName(p);
    return `${mkString(n.given)} ${asString(n.family)}`;
}