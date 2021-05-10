import { Model } from 'spinal-core-connectorjs_type';
declare class SpinalBacnetValueModel extends Model {
    constructor(graph: any, context: any, organ: any, network: any, node: any, sensor: any);
    addToNode(): Promise<void>;
    remToNode(): Promise<void>;
    getAllItem(): Promise<{
        context: unknown;
        node: unknown;
        graph: unknown;
        network: unknown;
        organ: unknown;
    }>;
    loadItem(name: any): Promise<unknown>;
    setWaitState(): void;
    setRecoverState(): void;
    setProgressState(): void;
    setNormalState(): void;
    setSuccessState(): void;
    setErrorState(): void;
}
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel };
