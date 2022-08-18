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

import { spinalCore, Model, Ptr, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalMonitorInfoModel from './SpinalMonitorInfoModel';

class SpinalListenerModel extends Model {
   constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, network: SpinalNode<any>, bmsDevice: SpinalNode<any>, organ: SpinalOrganConfigModel, monitor: SpinalMonitorInfoModel) {
      super();

      this.add_attr({
         id: uuidv4(),
         graph: new Pbr(graph),
         listen: true,
         saveTimeSeries: false,
         // timeInterval: timeInterval,
         device: new Pbr(bmsDevice),
         context: new Pbr(context),
         network: new Pbr(network),
         organ: new Pbr(organ),
         monitor: monitor
      })
   }
}

//@ts-ignore
spinalCore.register_models([SpinalListenerModel])
export default SpinalListenerModel;
export { SpinalListenerModel }