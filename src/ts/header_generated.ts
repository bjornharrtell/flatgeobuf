import { flatbuffers } from 'flatbuffers'
// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @enum {number}
 */
export enum GeometryType{
  Unknown= 0,
  Point= 1,
  LineString= 2,
  Polygon= 3,
  MultiPoint= 4,
  MultiLineString= 5,
  MultiPolygon= 6,
  GeometryCollection= 7,
  CircularString= 8,
  CompoundCurve= 9,
  CurvePolygon= 10,
  MultiCurve= 11,
  MultiSurface= 12,
  Curve= 13,
  Surface= 14,
  PolyhedralSurface= 15,
  TIN= 16,
  Triangle= 17
};

/**
 * @enum {number}
 */
export enum ColumnType{
  Byte= 0,
  UByte= 1,
  Bool= 2,
  Short= 3,
  UShort= 4,
  Int= 5,
  UInt= 6,
  Long= 7,
  ULong= 8,
  Float= 9,
  Double= 10,
  String= 11,
  Json= 12,
  DateTime= 13,
  Binary= 14
};

/**
 * @constructor
 */
export class Column {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns Column
 */
__init(i:number, bb:flatbuffers.ByteBuffer):Column {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Column= obj
 * @returns Column
 */
static getRoot(bb:flatbuffers.ByteBuffer, obj?:Column):Column {
  return (obj || new Column).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Column= obj
 * @returns Column
 */
static getSizePrefixedRoot(bb:flatbuffers.ByteBuffer, obj?:Column):Column {
  return (obj || new Column).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns ColumnType
 */
type():ColumnType {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? /**  */ (this.bb!.readUint8(this.bb_pos + offset)) : ColumnType.Byte;
};

/**
 * @param flatbuffers.Builder builder
 */
static start(builder:flatbuffers.Builder) {
  builder.startObject(2);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param ColumnType type
 */
static addType(builder:flatbuffers.Builder, type:ColumnType) {
  builder.addFieldInt8(1, type, ColumnType.Byte);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static end(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  builder.requiredField(offset, 4); // name
  return offset;
};

static create(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset, type:ColumnType):flatbuffers.Offset {
  Column.start(builder);
  Column.addName(builder, nameOffset);
  Column.addType(builder, type);
  return Column.end(builder);
}
}
/**
 * @constructor
 */
export class Crs {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns Crs
 */
__init(i:number, bb:flatbuffers.ByteBuffer):Crs {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Crs= obj
 * @returns Crs
 */
static getRoot(bb:flatbuffers.ByteBuffer, obj?:Crs):Crs {
  return (obj || new Crs).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Crs= obj
 * @returns Crs
 */
static getSizePrefixedRoot(bb:flatbuffers.ByteBuffer, obj?:Crs):Crs {
  return (obj || new Crs).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
org():string|null
org(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
org(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns number
 */
code():number {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
description():string|null
description(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
description(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
wkt():string|null
wkt(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
wkt(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param flatbuffers.Builder builder
 */
static start(builder:flatbuffers.Builder) {
  builder.startObject(5);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset orgOffset
 */
static addOrg(builder:flatbuffers.Builder, orgOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, orgOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param number code
 */
static addCode(builder:flatbuffers.Builder, code:number) {
  builder.addFieldInt32(1, code, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, nameOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset descriptionOffset
 */
static addDescription(builder:flatbuffers.Builder, descriptionOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, descriptionOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset wktOffset
 */
static addWkt(builder:flatbuffers.Builder, wktOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, wktOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static end(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

static create(builder:flatbuffers.Builder, orgOffset:flatbuffers.Offset, code:number, nameOffset:flatbuffers.Offset, descriptionOffset:flatbuffers.Offset, wktOffset:flatbuffers.Offset):flatbuffers.Offset {
  Crs.start(builder);
  Crs.addOrg(builder, orgOffset);
  Crs.addCode(builder, code);
  Crs.addName(builder, nameOffset);
  Crs.addDescription(builder, descriptionOffset);
  Crs.addWkt(builder, wktOffset);
  return Crs.end(builder);
}
}
/**
 * @constructor
 */
export class Header {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns Header
 */
__init(i:number, bb:flatbuffers.ByteBuffer):Header {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Header= obj
 * @returns Header
 */
static getRoot(bb:flatbuffers.ByteBuffer, obj?:Header):Header {
  return (obj || new Header).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param Header= obj
 * @returns Header
 */
static getSizePrefixedRoot(bb:flatbuffers.ByteBuffer, obj?:Header):Header {
  return (obj || new Header).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param number index
 * @returns number
 */
envelope(index: number):number|null {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readFloat64(this.bb!.__vector(this.bb_pos + offset) + index * 8) : 0;
};

/**
 * @returns number
 */
envelopeLength():number {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns Float64Array
 */
envelopeArray():Float64Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? new Float64Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
};

/**
 * @returns GeometryType
 */
geometryType():GeometryType {
  var offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? /**  */ (this.bb!.readUint8(this.bb_pos + offset)) : GeometryType.Point;
};

/**
 * @returns boolean
 */
hasZ():boolean {
  var offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns boolean
 */
hasM():boolean {
  var offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns boolean
 */
hasT():boolean {
  var offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns boolean
 */
hasTM():boolean {
  var offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
};

/**
 * @param number index
 * @param Column= obj
 * @returns Column
 */
columns(index: number, obj?:Column):Column|null {
  var offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? (obj || new Column).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
};

/**
 * @returns number
 */
columnsLength():number {
  var offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns flatbuffers.Long
 */
featuresCount():flatbuffers.Long {
  var offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.readUint64(this.bb_pos + offset) : this.bb!.createLong(0, 0);
};

/**
 * @returns number
 */
indexNodeSize():number {
  var offset = this.bb!.__offset(this.bb_pos, 22);
  return offset ? this.bb!.readUint16(this.bb_pos + offset) : 16;
};

/**
 * @param Crs= obj
 * @returns Crs|null
 */
crs(obj?:Crs):Crs|null {
  var offset = this.bb!.__offset(this.bb_pos, 24);
  return offset ? (obj || new Crs).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
};

/**
 * @param flatbuffers.Builder builder
 */
static start(builder:flatbuffers.Builder) {
  builder.startObject(11);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset envelopeOffset
 */
static addEnvelope(builder:flatbuffers.Builder, envelopeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, envelopeOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param Array.<number> data
 * @returns flatbuffers.Offset
 */
static createEnvelopeVector(builder:flatbuffers.Builder, data:number[] | Uint8Array):flatbuffers.Offset {
  builder.startVector(8, data.length, 8);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addFloat64(data[i]);
  }
  return builder.endVector();
};

/**
 * @param flatbuffers.Builder builder
 * @param number numElems
 */
static startEnvelopeVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(8, numElems, 8);
};

/**
 * @param flatbuffers.Builder builder
 * @param GeometryType geometryType
 */
static addGeometryType(builder:flatbuffers.Builder, geometryType:GeometryType) {
  builder.addFieldInt8(2, geometryType, GeometryType.Point);
};

/**
 * @param flatbuffers.Builder builder
 * @param boolean hasZ
 */
static addHasZ(builder:flatbuffers.Builder, hasZ:boolean) {
  builder.addFieldInt8(3, +hasZ, +false);
};

/**
 * @param flatbuffers.Builder builder
 * @param boolean hasM
 */
static addHasM(builder:flatbuffers.Builder, hasM:boolean) {
  builder.addFieldInt8(4, +hasM, +false);
};

/**
 * @param flatbuffers.Builder builder
 * @param boolean hasT
 */
static addHasT(builder:flatbuffers.Builder, hasT:boolean) {
  builder.addFieldInt8(5, +hasT, +false);
};

/**
 * @param flatbuffers.Builder builder
 * @param boolean hasTM
 */
static addHasTM(builder:flatbuffers.Builder, hasTM:boolean) {
  builder.addFieldInt8(6, +hasTM, +false);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset columnsOffset
 */
static addColumns(builder:flatbuffers.Builder, columnsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(7, columnsOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param Array.<flatbuffers.Offset> data
 * @returns flatbuffers.Offset
 */
static createColumnsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param flatbuffers.Builder builder
 * @param number numElems
 */
static startColumnsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Long featuresCount
 */
static addFeaturesCount(builder:flatbuffers.Builder, featuresCount:flatbuffers.Long) {
  builder.addFieldInt64(8, featuresCount, builder.createLong(0, 0));
};

/**
 * @param flatbuffers.Builder builder
 * @param number indexNodeSize
 */
static addIndexNodeSize(builder:flatbuffers.Builder, indexNodeSize:number) {
  builder.addFieldInt16(9, indexNodeSize, 16);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset crsOffset
 */
static addCrs(builder:flatbuffers.Builder, crsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(10, crsOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static end(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset offset
 */
static finishBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset offset
 */
static finishSizePrefixedBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
};

static create(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset, envelopeOffset:flatbuffers.Offset, geometryType:GeometryType, hasZ:boolean, hasM:boolean, hasT:boolean, hasTM:boolean, columnsOffset:flatbuffers.Offset, featuresCount:flatbuffers.Long, indexNodeSize:number, crsOffset:flatbuffers.Offset):flatbuffers.Offset {
  Header.start(builder);
  Header.addName(builder, nameOffset);
  Header.addEnvelope(builder, envelopeOffset);
  Header.addGeometryType(builder, geometryType);
  Header.addHasZ(builder, hasZ);
  Header.addHasM(builder, hasM);
  Header.addHasT(builder, hasT);
  Header.addHasTM(builder, hasTM);
  Header.addColumns(builder, columnsOffset);
  Header.addFeaturesCount(builder, featuresCount);
  Header.addIndexNodeSize(builder, indexNodeSize);
  Header.addCrs(builder, crsOffset);
  return Header.end(builder);
}
}
