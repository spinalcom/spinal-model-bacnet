import { Model } from 'spinal-core-connectorjs_type';
declare class SpinalDisoverModel extends Model {
    constructor(graph: any, contextInfo: any, network: any);
    setDiscoveringMode(): void;
    setDiscoveredMode(): void;
    setResetedMode(): void;
    setTimeoutMode(): void;
    setCreatingMode(): void;
    setCreatedMode(): void;
    addToGraph(graph: any): Promise<unknown>;
    remove(): void;
}
export default SpinalDisoverModel;
export { SpinalDisoverModel };
