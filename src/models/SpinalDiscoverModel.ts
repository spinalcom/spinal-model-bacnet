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

import { spinalCore, Model, Ptr, Lst, Pbr } from 'spinal-core-connectorjs_type';
import { STATES } from "../data/StateEnum";
import { v4 as uuidv4 } from "uuid";
import { SpinalGraph } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';

class SpinalDisoverModel extends Model {
   constructor(graph: SpinalGraph<any>, contextInfo: { id: string; name: string; type: string }, network: { id: string; name: string; type: string }, organ: SpinalOrganConfigModel) {
      super();

      this.add_attr({
         id: uuidv4(),
         state: STATES.reseted,
         graph: graph ? new Pbr(graph) : undefined,
         devices: new Lst(),
         context: contextInfo || {},
         network: network || {},
         organ: organ,
         creation: Date.now()
      })
   }

   public setDiscoveringMode(): void {
      this.state.set(STATES.discovering);
      // setTimeout(() => {
      //    if (this.state.get() === STATES.discovering) this.setTimeoutMode();
      // }, 40000)
   }

   public setDiscoveredMode(): void {
      this.state.set(STATES.discovered);
   }

   public setResetedMode(): void {
      this.state.set(STATES.reseted);
   }

   public setTimeoutMode(): void {
      this.state.set(STATES.timeout);
   }

   public setCreatingMode(): void {
      this.state.set(STATES.creating);
   }

   public setCreatedMode(): void {
      this.state.set(STATES.created);
   }

   public setErrorMode(): void {
      this.state.set(STATES.error);
   }

   public addToGraph(): Promise<boolean> {
      if (!this.organ.discover) {
         const x = new Lst();
         x.push(this);
         this.organ.add_attr({
            discover: new Ptr(x),
         });
         Promise.resolve(true);
      } else {
         return new Promise((resolve, reject) => {
            this.organ.discover.load((list) => {
               list.push(this);
               resolve(true);
            });
         });
      }
   }

   public remove(): Promise<boolean> {

      return new Promise((resolve, reject) => {
         this.organ.discover.load((list) => {
            for (let i = 0; i < list.length; i++) {
               const element = list[i];
               if (element._server_id === this._server_id) {
                  list.splice(i);
                  return resolve(true);
               }
            }
         });
      });

   }

}


spinalCore.register_models([SpinalDisoverModel])
export default SpinalDisoverModel;
export { SpinalDisoverModel }