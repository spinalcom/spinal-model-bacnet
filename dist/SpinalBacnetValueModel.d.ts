import { Model } from 'spinal-core-connectorjs_type';
declare class SpinalBacnetValueModel extends Model {
    constructor(graph: any, context: any, network: any, node: any);
    addToNode(): void;
    remToNode(): void;
    getAllItem(): Promise<{
        context: unknown;
        node: unknown;
        graph: unknown;
        network: unknown;
    }>;
    loadItem(name: any): Promise<unknown>;
}
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel };
