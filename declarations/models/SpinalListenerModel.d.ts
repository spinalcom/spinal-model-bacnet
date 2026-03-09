import { SpinalGraph } from 'spinal-model-graph';
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import { SpinalListener } from "spinal-connector-service";
declare class SpinalListenerModel extends SpinalListener {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, bmsDevice?: SpinalNode, profile?: SpinalNode);
}
export default SpinalListenerModel;
export { SpinalListenerModel };
