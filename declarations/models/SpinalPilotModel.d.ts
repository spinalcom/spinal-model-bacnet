import { Model } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { IRequest } from '../data/IRequest';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalPilotModel extends Model {
    constructor(organ?: SpinalOrganConfigModel, request?: IRequest | IRequest[], nodeToPilot?: SpinalNode);
    setNormalMode(): void;
    setProcessMode(): void;
    setSuccessMode(): void;
    setErrorMode(): void;
    isNormal(): boolean;
    getOrgan(): Promise<SpinalOrganConfigModel>;
    addToGraph(): Promise<number>;
    removeFromGraph(): Promise<boolean>;
    addToNode(endpoint: SpinalNode<any>): Promise<any>;
    removeFromNode(): Promise<any>;
}
export default SpinalPilotModel;
export { SpinalPilotModel };
