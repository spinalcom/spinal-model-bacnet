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
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { BACNET_VALUES_STATE } from '../data/constants';
import { IAllItemsRes } from '../data/IAllItemsRes';

class SpinalBacnetValueModel extends Model {
   constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: SpinalNode, node?: SpinalNode, sensor?: number[]) {
      super();

      if (!graph || !context || !organ || !network || !node || !sensor) return;

      this.add_attr({
         id: uuidv4(),
         context: new Pbr(context),
         node: new Pbr(node),
         graph: new Pbr(graph),
         network: new Pbr(network),
         organ: new Pbr(organ),
         state: BACNET_VALUES_STATE.wait,
         sensor: sensor,
         progress: 0
      })
   }

   public changeState(state: typeof BACNET_VALUES_STATE[keyof typeof BACNET_VALUES_STATE]): void {
      this.state.set(state);
   }

   public getGraph(): Promise<SpinalGraph> {
      return this.loadPtr(this.graph);
   }

   public async getOrgan(): Promise<SpinalNode> {
      return this.loadPtr(this.organ);
   }

   public getContext(): Promise<SpinalContext> {
      return this.loadPtr(this.context);
   }

   public getNode(): Promise<SpinalNode> {
      return this.loadPtr(this.node);
   }

   public getNetwork(): Promise<SpinalNode> {
      return this.loadPtr(this.network);
   }

   public addToGraph(): Promise<number> {
      return this.getOrgan().then(async (organNode: SpinalNode) => {
         const organ = await organNode.getElement(true) as SpinalOrganConfigModel;
         return organ.addBacnetValuesModelToGraph(this);
      })
   }

   public removeFromGraph(): Promise<boolean> {
      return this.getOrgan().then(async (organNode: SpinalNode) => {
         const organ = await organNode.getElement(true) as SpinalOrganConfigModel;
         return organ.removeBacnetValuesModelFromGraph(this);
      })
   }

   public getAllItem(): Promise<IAllItemsRes> {
      const promises = [this.getContext(), this.getNode(), this.getGraph(), this.getNetwork(), this.getOrgan()];

      return Promise.all(promises).then(([context, node, graph, network, organ]) => {
         return { context, node, graph, network, organ } as IAllItemsRes;
      })
   }

   public loadPtr(ptr: spinal.Ptr): Promise<SpinalNode | SpinalContext | SpinalGraph | SpinalNode | any> {
      return new Promise((resolve) => ptr.load((res) => resolve(res)));
   }


}

spinalCore.register_models([SpinalBacnetValueModel])
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel }