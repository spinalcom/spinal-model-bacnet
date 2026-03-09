import { Lst } from 'spinal-core-connectorjs_type';
import { SpinalOrganModel } from "spinal-connector-service";
import SpinalBacnetValueModel from './SpinalBacnetValueModel';
declare class SpinalOrganConfigModel extends SpinalOrganModel {
    static TYPE: string;
    static CONTEXT_TO_ORGAN_RELATION: string;
    constructor(name?: string, type?: string);
    addBacnetValuesModelToGraph(allBacnetValues: SpinalBacnetValueModel): Promise<number>;
    removeBacnetValuesModelFromGraph(bacnetValuesModel: SpinalBacnetValueModel): Promise<boolean>;
    getBacnetValuesModelFromGraph(): Promise<Lst<SpinalBacnetValueModel> | undefined>;
}
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel };
