import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalMonitorInfoModel from './SpinalMonitorInfoModel';
declare class SpinalListenerModel extends Model {
    constructor(graph?: SpinalGraph<any>, context?: SpinalContext<any>, network?: SpinalNode<any>, bmsDevice?: SpinalNode<any>, organ?: SpinalOrganConfigModel, monitor?: SpinalMonitorInfoModel);
}
export default SpinalListenerModel;
export { SpinalListenerModel };
