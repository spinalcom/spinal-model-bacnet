import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { SpinalDiscover } from "spinal-connector-service";
import { INetwork } from '../data/INetwork';
declare class SpinalDisoverModel extends SpinalDiscover {
    constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: INetwork);
    setDiscoveringState(): void;
    setDiscoveredState(): void;
    setInitialState(): void;
    setResetedState(): void;
    setTimeoutState(): void;
    setCreatingState(): void;
    setCreatedState(): void;
    setErrorState(): void;
}
export default SpinalDisoverModel;
export { SpinalDisoverModel };
