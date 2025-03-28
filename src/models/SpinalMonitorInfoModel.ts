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

import { spinalCore, Model, Ptr, Pbr, Lst } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";

class SpinalMonitorInfoModel extends Model {


   constructor(profil?: SpinalNode<any>, monit?: Array<{ monitor: boolean, interval: number, children: [] }>) {
      super();
      if (!profil || !monit) return;

      this.add_attr({
         id: uuidv4(),
         profil: new Pbr(profil),
         data: monit
      })
   }

   public getMonitoringData(): Array<{ monitor: boolean, interval: number, children: [] }> {
      return this.data.get();
   }

}

spinalCore.register_models([SpinalMonitorInfoModel])
export default SpinalMonitorInfoModel;
export { SpinalMonitorInfoModel }