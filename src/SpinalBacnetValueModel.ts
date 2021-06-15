import { spinalCore, Model, Ptr, Choice } from 'spinal-core-connectorjs_type';
import { SpinalContext, SpinalGraph, SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";

class SpinalBacnetValueModel extends Model {
   constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, organ: SpinalNode<any>, network: SpinalNode<any>, node: SpinalNode<any>, sensor: any) {
      super();
      this.add_attr({
         id: uuidv4(),
         context: new Ptr(context),
         node: new Ptr(node),
         graph: new Ptr(graph),
         network: new Ptr(network),
         organ: new Ptr(organ),
         state: 'wait',
         sensor: sensor,
         progress: 0
      })
   }

   public addToNode(): Promise<void> {
      return this.loadItem('node').then((node: any) => {
         node.info.add_attr({ bacnet: new Ptr(this) });
      })
   }

   public remToNode(): Promise<void> {
      return this.loadItem('node').then((node: any) => {
         node.info.rem_attr('bacnet');
      })

   }

   public getAllItem(): Promise<{
      node: SpinalNode<any>;
      context: SpinalContext<any>;
      graph: SpinalGraph<any>;
      network: SpinalNode<any>;
      organ: any;
   }> {
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

   public loadItem(name: string): Promise<SpinalNode<any> | SpinalContext<any> | SpinalGraph<any> | SpinalNode<any> | any> {
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