import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { STATES } from "../stateEnum";
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';

class SpinalDisoverModel extends Model {
   constructor(graph: SpinalGraph<any>, contextInfo: { id: string; name: string; type: string }, network: { id: string; name: string; type: string }, organ: SpinalOrganConfigModel) {
      super();

      this.add_attr({
         id: uuidv4(),
         state: STATES.reseted,
         graph: graph ? new Ptr(graph) : undefined,
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