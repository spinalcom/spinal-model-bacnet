import { SpinalNode } from "spinal-env-viewer-graph-service";
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
    organ: SpinalNode;
    context: SpinalNode;
    device: SpinalNode;
    network: SpinalNode;
    profile: SpinalNode;
}
