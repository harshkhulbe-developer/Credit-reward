export declare class Auth {
    hashPassword(plainPassword: string): any;
    comparePassword(plainPassword: any, hash: any): Promise<any>;
}
declare const _default: Auth;
export default _default;
