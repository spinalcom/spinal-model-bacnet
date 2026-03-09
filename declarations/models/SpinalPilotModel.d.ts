import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { IRequest } from '../data/IRequest';
import { SpinalPilot } from "spinal-connector-service";
declare class SpinalPilotModel extends SpinalPilot<IRequest> {
    constructor(organ?: SpinalNode, request?: IRequest | IRequest[]);
    isNormal(): boolean;
}
export default SpinalPilotModel;
export { SpinalPilotModel };
