import {ComponentType,FC} from "react";

export type Route={
    path:string,
    component:any,
    Routes?:Routes
}
export type Routes=Route[];