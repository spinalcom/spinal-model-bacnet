import { spinalCore, Model, Ptr, Choice } from 'spinal-core-connectorjs_type';


class SpinalBacnetValueModel extends Model {
   constructor(graph: any, context: any, organ: any, network: any, node: any, sensor: any) {
      super();
      this.add_attr({
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

   addToNode() {
      return this.loadItem('node').then((node: any) => {
         node.info.add_attr({ bacnet: new Ptr(this) });
      })
   }

   remToNode() {
      return this.loadItem('node').then((node: any) => {
         node.info.rem_attr('bacnet');
      })

   }

   getAllItem() {
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

   loadItem(name) {
      return new Promise((resolve, reject) => {
         this[name].load((res) => {
            resolve(res);
         })
      });
   }


   setWaitState() {
      this.state.set("wait")
   }

   setRecoverState() {
      this.state.set("recover")
   }

   setProgressState() {
      this.state.set("progress")
   }

   setNormalState() {
      this.state.set("normal")
   }

   setSuccessState() {
      this.state.set("success")
   }

   setErrorState() {
      this.state.set("error")
   }


}


spinalCore.register_models([SpinalBacnetValueModel])
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel }