import {ComponentType} from "react";

export type Route={
    path:string,
    component:ComponentType,
    Routes?:Routes
}
export type Routes=Route[];