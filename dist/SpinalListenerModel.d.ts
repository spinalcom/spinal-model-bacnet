import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalListenerModel extends Model {
    constructor(graph: SpinalGraph<any>, context: any, network: any, bmsDeviceInfo: any, organ: SpinalOrganConfigModel, monitor: any);
}
export default SpinalListenerModel;
export { SpinalListenerModel };
