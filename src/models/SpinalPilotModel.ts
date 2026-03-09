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

import { spinalCore, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { IRequest } from '../data/IRequest';
import { SpinalPilot, STATES } from "spinal-connector-service"

class SpinalPilotModel extends SpinalPilot<IRequest> {
   constructor(organ?: SpinalNode, request?: IRequest | IRequest[]) {
      super(organ, request);

      if (!organ || !request) return;
   }

   public isNormal() {
      return this.state.get() === STATES.initial;
   }

}

spinalCore.register_models([SpinalPilotModel])
export default SpinalPilotModel;
export { SpinalPilotModel };