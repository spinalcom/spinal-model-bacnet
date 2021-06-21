import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";

class SpinalMonitorInfoModel extends Model {


   constructor(profil: SpinalNode<any>, monit: Array<{ monitor: boolean, interval: number, children: [] }>) {
      super();

      this.add_attr({
         id: uuidv4(),
         profil: new Ptr(profil),
         data: monit
      })
   }

}


spinalCore.register_models([SpinalMonitorInfoModel])
export default SpinalMonitorInfoModel;
export { SpinalMonitorInfoModel }