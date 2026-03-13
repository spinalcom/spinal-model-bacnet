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

import { spinalCore, Lst } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { IDevice } from '../data/IDevice';
import { SpinalDiscover, STATES } from "spinal-connector-service";
import { INetwork } from '../data/INetwork';

class SpinalDiscoverModel extends SpinalDiscover {
   constructor(graph?: SpinalGraph, context?: SpinalContext, organ?: SpinalNode, network?: INetwork) {
      super(graph, context, organ);
      if (!graph || !context || !network) return;

      this.add_attr({
         network
      });
   }

   public setDiscoveringState(): void {
      this.changeState(STATES.discovering);
   }

   public setDiscoveredState(): void {
      this.changeState(STATES.discovered);
   }

   public setInitialState(): void {
      this.changeState(STATES.initial);
   }

   public setResetedState(): void {
      console.warn("depricated method, use setInitialState instead");
      this.setInitialState();
   }

   public setTimeoutState(): void {
      this.changeState(STATES.timeout);
   }

   public setCreatingState(): void {
      this.changeState(STATES.creating);
   }

   public setCreatedState(): void {
      this.changeState(STATES.created);
   }

   public setErrorState(): void {
      this.changeState(STATES.error);
   }

}

spinalCore.register_models([SpinalDiscoverModel])
export default SpinalDiscoverModel;
export { SpinalDiscoverModel }