import { Model } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { BACNET_VALUES_STATE } from '../data/constants';
import { IAllItemsRes } from '../data/IAllItemsRes';
declare class SpinalBacnetValueModel extends Model {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, node?: SpinalNode, sensor?: number[]);
    changeState(state: typeof BACNET_VALUES_STATE[keyof typeof BACNET_VALUES_STATE]): void;
    getGraph(): Promise<SpinalGraph>;
    getOrgan(): Promise<SpinalNode>;
    getContext(): Promise<SpinalContext>;
    getNode(): Promise<SpinalNode>;
    getNetwork(): Promise<SpinalNode>;
    addToGraph(): Promise<number>;
    removeFromGraph(): Promise<boolean>;
    getAllItem(): Promise<IAllItemsRes>;
    loadPtr(ptr: spinal.Ptr): Promise<SpinalNode | SpinalContext | SpinalGraph | SpinalNode | any>;
}
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel };
