import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalDisoverModel extends Model {
    constructor(graph?: SpinalGraph, contextInfo?: {
        id: string;
        name: string;
        type: string;
    }, network?: {
        id: string;
        name: string;
        type: string;
    }, organ?: SpinalOrganConfigModel);
    setDiscoveringMode(): void;
    setDiscoveredMode(): void;
    setResetedMode(): void;
    setTimeoutMode(): void;
    setCreatingMode(): void;
    setCreatedMode(): void;
    setErrorMode(): void;
    getOrgan(): Promise<SpinalOrganConfigModel>;
    addToGraph(): Promise<number>;
    remove(): Promise<boolean>;
}
export default SpinalDisoverModel;
export { SpinalDisoverModel };
