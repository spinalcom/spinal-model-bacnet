import { Model } from 'spinal-core-connectorjs_type';
declare class SpinalDisoverModel extends Model {
    constructor(graph: any, contextInfo: any, network: any, organ: any);
    setDiscoveringMode(): void;
    setDiscoveredMode(): void;
    setResetedMode(): void;
    setTimeoutMode(): void;
    setCreatingMode(): void;
    setCreatedMode(): void;
    setErrorMode(): void;
    addToGraph(): Promise<unknown>;
    remove(): Promise<unknown>;
}
export default SpinalDisoverModel;
export { SpinalDisoverModel };
