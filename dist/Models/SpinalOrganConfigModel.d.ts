import { Model } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
declare const BACNET_ORGAN_TYPE = "BACNET_ORGAN";
declare class SpinalOrganConfigModel extends Model {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    constructor(name: string, type?: string);
    addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>>;
    isReferencedInContext(contextId: string): Promise<boolean>;
    removeReference(contextId: string): Promise<SpinalNode<any>>;
}
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel, BACNET_ORGAN_TYPE };
