import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalMonitorInfoModel from './SpinalMonitorInfoModel';
import { IDataNodes } from '../data/IRequest';
declare class SpinalListenerModel extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, network?: SpinalNode, bmsDevice?: SpinalNode, organ?: SpinalOrganConfigModel, monitor?: SpinalMonitorInfoModel);
    getAllData(): Promise<IDataNodes>;
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalOrganConfigModel>;
    getContext(): Promise<SpinalContext>;
    getBmsDevice(): Promise<SpinalNode>;
    getNetwork(): Promise<SpinalNode>;
    addToGraph(): Promise<number>;
    removeFromGraph(): Promise<boolean>;
    addToDevice(): Promise<void>;
    private _loadData;
}
export default SpinalListenerModel;
export { SpinalListenerModel };
