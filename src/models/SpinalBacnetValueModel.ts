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

import { spinalCore, Model, Ptr, Pbr, Choice } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import SpinalOrganConfigModel from './SpinalOrganConfigModel';

class SpinalBacnetValueModel extends Model {
   constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalOrganConfigModel, network?: SpinalNode, node?: SpinalNode, sensor?: number[]) {
      super();

      if (!graph || !context || !organ || !network || !node || !sensor) return;

      this.add_attr({
         id: uuidv4(),
         context: new Pbr(context),
         node: new Pbr(node),
         graph: new Pbr(graph),
         network: new Pbr(network),
         organ: new Pbr(organ),
         state: 'wait',
         sensor: sensor,
         progress: 0
      })
   }

   public addToGraph(): Promise<number> {
      return this.loadItem("organ").then(async (organElement: SpinalOrganConfigModel) => {
         // const organElement = await organ.getElement(true);
         // if(organElement){
            const length = await organElement.addAllBacnetModelToGraph(this);
            await this.addToNode();
            return length;
         // }
      })
   }

   public removeFromGraph(): Promise<boolean> {
      return this.loadItem("organ").then(async (organElement: SpinalOrganConfigModel) => {
         // const organElement = await organ.getElement(true);
         // if(organElement){
            const removed = await organElement.removebacnetValueModelFromGraph(this);
            await this.remFromNode();
            return removed;
         // }
      })
   }

   public addToNode(): Promise<void> {
      return this.loadItem('node').then((node: any) => {
         
         node.info.add_attr({ bacnet: new Ptr(this) });
      })
   }

   public remFromNode(): Promise<void> {
      return this.loadItem('node').then((node: any) => {
         if (node.info.bacnet) node.info.rem_attr("bacnet");
         node.info.rem_attr('bacnet');
      })
   }

   public getAllItem(): Promise<{node: SpinalNode; context: SpinalContext; graph: SpinalGraph; network: SpinalNode; organ: SpinalOrganConfigModel;}> {
      const promises = [this.loadItem('context'), this.loadItem('node'), this.loadItem('graph'), this.loadItem('network'), this.loadItem('organ')];
      return Promise.all(promises).then(([context, node, graph, network, organ]) => {
         return {
            context,
            node,
            graph,
            network,
            organ
         }
      })
   }

   public loadItem(name: string): Promise<SpinalNode | SpinalContext | SpinalGraph | SpinalNode | any> {
      return new Promise((resolve, reject) => {
         this[name].load((res) => {
            resolve(res);
         })
      });
   }


   public setWaitState(): void {
      this.state.set("wait")
   }

   public setRecoverState(): void {
      this.state.set("recover")
   }

   public setProgressState(): void {
      this.state.set("progress")
   }

   public setNormalState(): void {
      this.state.set("normal")
   }

   public setSuccessState(): void {
      this.state.set("success")
   }

   public setErrorState(): void {
      this.state.set("error")
   }

}

spinalCore.register_models([SpinalBacnetValueModel])
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel }