import { spinalCore, Model, Ptr } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalMonitorInfoModel from './SpinalMonitorInfoModel';

class SpinalListenerModel extends Model {
   constructor(graph: SpinalGraph<any>, context: SpinalContext<any>, network: SpinalNode<any>, bmsDevice: SpinalNode<any>, organ: SpinalOrganConfigModel, monitor: SpinalMonitorInfoModel) {
      super();

      this.add_attr({
         id: uuidv4(),
         graph: new Ptr(graph),
         listen: true,
         saveTimeSeries: false,
         // timeInterval: timeInterval,
         device: new Ptr(bmsDevice),
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