import { spinalCore, Model, Ptr } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';

class SpinalListenerModel extends Model {
   constructor(graph: SpinalGraph<any>, context: any, network: any, bmsDeviceInfo: any, organ: SpinalOrganConfigModel, monitor: any) {
      super();

      this.add_attr({
         graph: new Ptr(graph),
         listen: true,
         saveTimeSeries: false,
         // timeInterval: timeInterval,
         device: new Ptr(bmsDeviceInfo),
         context: new Ptr(context),
         network: new Ptr(network),
         organ: new Ptr(organ),
         monitor: monitor
      })
   }
}


spinalCore.register_models([SpinalListenerModel])
export default SpinalListenerModel;
export { SpinalListenerModel }