import { Model } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
declare class SpinalApiDiscoverModel extends Model {
    constructor(graph: SpinalGraph<any>, contextInfo: {
        id: string;
        name: string;
        type: string;
    }, apiServerInfo: {
        id: string;
        name: string;
        type: string;
    }, organ: SpinalOrganConfigModel);
    setDiscoveringMode(): void;
    setDiscoveredMode(): void;
    setResetedMode(): void;
    setTimeoutMode(): void;
    setCreatingMode(): void;
    setCreatedMode(): void;
    setErrorMode(): void;
    addToGraph(): Promise<boolean>;
    remove(): Promise<boolean>;
}
export default SpinalApiDiscoverModel;
export { SpinalApiDiscoverModel };
