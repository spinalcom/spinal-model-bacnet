import { Model } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalBacnetValueModel extends Model {
    constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalNode<any>, network: SpinalNode<any>, node: SpinalNode<any>, sensor: number[]);
    addToNode(): Promise<void>;
    remToNode(): Promise<void>;
    getAllItem(): Promise<{
        node: SpinalNode<any>;
        context: SpinalContext<any>;
        graph: SpinalGraph<any>;
        network: SpinalNode<any>;
        organ: SpinalOrganConfigModel;
    }>;
    loadItem(name: string): Promise<SpinalNode<any> | SpinalContext<any> | SpinalGraph<any> | SpinalNode<any> | any>;
    setWaitState(): void;
    setRecoverState(): void;
    setProgressState(): void;
    setNormalState(): void;
    setSuccessState(): void;
    setErrorState(): void;
}
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel };
