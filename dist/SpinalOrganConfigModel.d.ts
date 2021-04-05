import { Model } from 'spinal-core-connectorjs_type';
declare const BACNET_ORGAN_TYPE = "BACNET_ORGAN";
declare class SpinalOrganConfigModel extends Model {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    constructor(name: string);
    addReference(contextId: string, spinalNode: any): Promise<unknown>;
    isReferencedInContext(contextId: any): Promise<unknown>;
    removeReference(contextId: string): Promise<unknown>;
}
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel, BACNET_ORGAN_TYPE };
