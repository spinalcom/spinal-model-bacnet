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

import { spinalCore, Model, Ptr, Lst, Choice } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import { IRequest } from '../data/IRequest';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';


class SpinalPilotModel extends Model {
   constructor(organ: SpinalOrganConfigModel, request: IRequest | IRequest[]) {
      super();
      this.add_attr({
         id: uuidv4(),
         state: new Choice(0, ["normal", "process", "success", "error"]),
         organ: organ,
         requests: Array.isArray(request) ? request : [request]
      })
   }


   public setNormalMode() {
      this.state.set("normal");
   }

   public setProcessMode() {
      this.state.set("process");
   }

   public setSuccessMode() {
      this.state.set("success");
   }

   public setErrorMode() {
      this.state.set("error");
   }

   public isNormal() {
      return this.state.get() === "normal";
   }

   public addToNode(endpoint: SpinalNode<any>): Promise<any> {
      return new Promise((resolve) => {
         if (!endpoint.info.pilot) {
            const model = new Lst();
            model.push(this);
            endpoint.info.add_attr({ pilot: new Ptr(model) });
            resolve(model);
         } else {
            endpoint.info.pilot.load(lst => {
               lst.push(this)
               resolve(lst);
            })
         }
      }).then((res) => {
         this.add_attr({ node: endpoint });
         return res;
      })
   }

   public removeToNode(): Promise<any> {
      return new Promise((resolve, reject) => {
         if (this.node) {
            this.node.info.pilot.load(lst => {
               for (let i = 0; i < lst.length; i++) {
                  const element = lst[i];
                  if (element.id.get() === this.id.get()) {
                     lst.splice(i);
                     break;
                  }
               }
               resolve(true);
            })
         } else {
            resolve(false)
         }
      });
   }
}

spinalCore.register_models([SpinalPilotModel])
export default SpinalPilotModel;
export { SpinalPilotModel };