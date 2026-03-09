/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 * 
 * This file is part of SpinalCore.
 * 
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 * 
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 * 
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import { Lst, spinalCore } from 'spinal-core-connectorjs_type';
import { BACNET_ORGAN_TYPE } from "../data/constants";
import { ModelsInfo, SpinalOrganModel } from "spinal-connector-service";
import SpinalBacnetValueModel from './SpinalBacnetValueModel';

class SpinalOrganConfigModel extends SpinalOrganModel {

   static TYPE: string = BACNET_ORGAN_TYPE;
   static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";

   constructor(name?: string, type: string = BACNET_ORGAN_TYPE) {
      super(name, type);

      if (!name) return;

      this.add_attr({
         allBacnetValues: new ModelsInfo<SpinalBacnetValueModel>()
      })
   }


   public addBacnetValuesModelToGraph(allBacnetValues: SpinalBacnetValueModel): Promise<number> {
      if (!this.allBacnetValues) this.add_attr({ allBacnetValues: new ModelsInfo<SpinalBacnetValueModel>() });
      return this.allBacnetValues.addModel(allBacnetValues);
   }

   public removeBacnetValuesModelFromGraph(bacnetValuesModel: SpinalBacnetValueModel): Promise<boolean> {
      if (this.allBacnetValues) return this.allBacnetValues.removeModel(bacnetValuesModel);
      return Promise.resolve(false);
   }

   public getBacnetValuesModelFromGraph(): Promise<Lst<SpinalBacnetValueModel> | undefined> {
      if (!this.allBacnetValues) return Promise.resolve(undefined);
      return this.allBacnetValues.getList();
   }




}

//@ts-ignore
spinalCore.register_models([SpinalOrganConfigModel])
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel };
