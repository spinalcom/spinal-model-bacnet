import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { STATES } from "./stateEnum";

class SpinalDisoverModel extends Model {
   constructor(graph, contextInfo, network) {
      super();

      this.add_attr({
         state: STATES.reseted,
         graph: new Ptr(graph),
         devices: new Lst(),
         context: contextInfo,
         network: network,
         creation: Date.now()
      })
   }

   setDiscoveringMode() {
      this.state.set(STATES.discovering);
      setTimeout(() => {
         if (this.state.get() === STATES.discovering) this.setTimeoutMode();
      }, 40000)
   }

   setDiscoveredMode() {
      this.state.set(STATES.discovered);
   }

   setResetedMode() {
      this.state.set(STATES.reseted);
   }

   setTimeoutMode() {
      this.state.set(STATES.timeout);
   }

   setCreatingMode() {
      this.state.set(STATES.creating);
   }

   setCreatedMode() {
      this.state.set(STATES.created);
   }

   addToGraph(graph) {
      if (!graph.info.discover) {
         const x = new Lst();
         x.push(this);
         graph.info.add_attr({
            discover: new Ptr(x),
         });
         Promise.resolve(true);
      } else {
         return new Promise((resolve, reject) => {
            graph.info.discover.load((list) => {
               list.push(this);
               resolve(true);
            });
         });
      }
   }

   remove() {
      this.graph.load(graph => {
         graph.info.discover.load((list) => {
            for (let i = 0; i < list.length; i++) {
               const element = list[i];
               if (element._server_id === this._server_id) {
                  list.splice(i);
                  return;
               }
            }

         });
      })

   }

}


spinalCore.register_models([SpinalDisoverModel])
export default SpinalDisoverModel;
export { SpinalDisoverModel }