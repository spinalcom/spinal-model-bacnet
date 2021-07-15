
export interface IRequest {
   address: string;
   deviceId: number | string
   objectId: { type: number; instance: number };
   value: string | number | boolean;
}