import { Model } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { IRequest } from '../data/IRequest';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalPilotModel extends Model {
    constructor(organ?: SpinalOrganConfigModel, request?: IRequest | IRequest[]);
    setNormalMode(): void;
    setProcessMode(): void;
    setSuccessMode(): void;
    setErrorMode(): void;
    isNormal(): boolean;
    addToNode(endpoint: SpinalNode<any>): Promise<any>;
    removeToNode(): Promise<any>;
}
export default SpinalPilotModel;
export { SpinalPilotModel };
