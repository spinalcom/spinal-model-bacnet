import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { STATES } from "./stateEnum";

class SpinalDisoverModel extends Model {
   constructor(graph, contextInfo, network, organ) {
      super();

      this.add_attr({
         state: STATES.reseted,
         graph: graph ? new Ptr(graph) : undefined,
         devices: new Lst(),
         context: contextInfo || {},
         network: network || {},
         organ: organ,
         creation: Date.now()
      })
   }

   setDiscoveringMode() {
      this.state.set(STATES.discovering);
      // setTimeout(() => {
      //    if (this.state.get() === STATES.discovering) this.setTimeoutMode();
      // }, 40000)
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

   setErrorMode() {
      this.state.set(STATES.error);
   }

   addToGraph() {
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

   remove() {
      // this.graph.load(graph => {
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

      // })

   }

}


spinalCore.register_models([SpinalDisoverModel])
export default SpinalDisoverModel;
export { SpinalDisoverModel }