import { spinalCore, Model, Ptr, Choice } from 'spinal-core-connectorjs_type';


class SpinalBacnetValueModel extends Model {
   constructor(graph: any, context: any, network: any, node: any, sensor: any) {
      super();
      this.add_attr({
         context: new Ptr(context),
         node: new Ptr(node),
         graph: new Ptr(graph),
         network: new Ptr(network),
         state: new Choice(0, ['normal', 'success', 'error']),
         sensor: sensor
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
      const promises = [this.loadItem('context'), this.loadItem('node'), this.loadItem('graph'), this.loadItem('network')];
      return Promise.all(promises).then(([context, node, graph, network]) => {
         return {
            context,
            node,
            graph,
            network
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


}


spinalCore.register_models([SpinalBacnetValueModel])
export default SpinalBacnetValueModel;
export { SpinalBacnetValueModel }