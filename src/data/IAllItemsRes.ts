import { SpinalContext, SpinalGraph, SpinalNode } from "spinal-env-viewer-graph-service";

export interface IAllItemsRes {
    graph: SpinalGraph;
    organ: SpinalNode;
    node: SpinalNode;
    context: SpinalContext;
    network: SpinalNode;
}