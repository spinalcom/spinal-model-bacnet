export interface IRequest {
    address: string;
    deviceId: number | string;
    objectId: {
        type: number | string;
        instance: number | string;
    };
    value: string | number | boolean;
}
