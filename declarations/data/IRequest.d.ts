import { SpinalNode } from "spinal-env-viewer-graph-service";
import SpinalOrganConfigModel from "../models/SpinalOrganConfigModel";
export interface IRequest {
    address: string;
    SADR?: any;
    deviceId: number | string;
    objectId: {
        type: number | string;
        instance: number | string;
    };
    value: string | number | boolean;
}
export interface IDataNodes {
    graph: SpinalNode;
    organ: SpinalOrganConfigModel;
    context: SpinalNode;
    device: SpinalNode;
    network: SpinalNode;
    profile: SpinalNode;
}
