import SelectAffiliation from "./SelectAffiliation"
import RevealRandomCharacter from "./RevealRandomCharacter";
import Home from "../Home"

export interface IActions {[className: string] : any;}
export const actions:IActions =  {
    "SelectAffiliation": SelectAffiliation,
    "RevealRandomCharacter": RevealRandomCharacter,
    "Home": Home,
    "Error": Error
}