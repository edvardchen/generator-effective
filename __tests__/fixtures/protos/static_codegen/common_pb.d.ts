// package: common
// file: common.proto

import * as jspb from "google-protobuf";

export class CommonObj extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommonObj.AsObject;
  static toObject(includeInstance: boolean, msg: CommonObj): CommonObj.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommonObj, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommonObj;
  static deserializeBinaryFromReader(message: CommonObj, reader: jspb.BinaryReader): CommonObj;
}

export namespace CommonObj {
  export type AsObject = {
    id: number,
  }
}

