// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace FlatGeobuf
{

using global::System;
using global::FlatBuffers;

public struct Header : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static Header GetRootAsHeader(ByteBuffer _bb) { return GetRootAsHeader(_bb, new Header()); }
  public static Header GetRootAsHeader(ByteBuffer _bb, Header obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public Header __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public string Name { get { int o = __p.__offset(4); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> GetNameBytes() { return __p.__vector_as_span(4); }
#else
  public ArraySegment<byte>? GetNameBytes() { return __p.__vector_as_arraysegment(4); }
#endif
  public byte[] GetNameArray() { return __p.__vector_as_array<byte>(4); }
  public double Envelope(int j) { int o = __p.__offset(6); return o != 0 ? __p.bb.GetDouble(__p.__vector(o) + j * 8) : (double)0; }
  public int EnvelopeLength { get { int o = __p.__offset(6); return o != 0 ? __p.__vector_len(o) : 0; } }
#if ENABLE_SPAN_T
  public Span<byte> GetEnvelopeBytes() { return __p.__vector_as_span(6); }
#else
  public ArraySegment<byte>? GetEnvelopeBytes() { return __p.__vector_as_arraysegment(6); }
#endif
  public double[] GetEnvelopeArray() { return __p.__vector_as_array<double>(6); }
  public GeometryType GeometryType { get { int o = __p.__offset(8); return o != 0 ? (GeometryType)__p.bb.Get(o + __p.bb_pos) : GeometryType.Unknown; } }
  public bool HasZ { get { int o = __p.__offset(10); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }
  public bool HasM { get { int o = __p.__offset(12); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }
  public bool HasT { get { int o = __p.__offset(14); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }
  public bool HasTM { get { int o = __p.__offset(16); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }
  public Column? Columns(int j) { int o = __p.__offset(18); return o != 0 ? (Column?)(new Column()).__assign(__p.__indirect(__p.__vector(o) + j * 4), __p.bb) : null; }
  public int ColumnsLength { get { int o = __p.__offset(18); return o != 0 ? __p.__vector_len(o) : 0; } }
  public ulong FeaturesCount { get { int o = __p.__offset(20); return o != 0 ? __p.bb.GetUlong(o + __p.bb_pos) : (ulong)0; } }
  public ushort IndexNodeSize { get { int o = __p.__offset(22); return o != 0 ? __p.bb.GetUshort(o + __p.bb_pos) : (ushort)16; } }
  public Crs? Crs { get { int o = __p.__offset(24); return o != 0 ? (Crs?)(new Crs()).__assign(__p.__indirect(o + __p.bb_pos), __p.bb) : null; } }

  public static Offset<Header> CreateHeader(FlatBufferBuilder builder,
      StringOffset nameOffset = default(StringOffset),
      VectorOffset envelopeOffset = default(VectorOffset),
      GeometryType geometry_type = GeometryType.Unknown,
      bool hasZ = false,
      bool hasM = false,
      bool hasT = false,
      bool hasTM = false,
      VectorOffset columnsOffset = default(VectorOffset),
      ulong features_count = 0,
      ushort index_node_size = 16,
      Offset<Crs> crsOffset = default(Offset<Crs>)) {
    builder.StartObject(11);
    Header.AddFeaturesCount(builder, features_count);
    Header.AddCrs(builder, crsOffset);
    Header.AddColumns(builder, columnsOffset);
    Header.AddEnvelope(builder, envelopeOffset);
    Header.AddName(builder, nameOffset);
    Header.AddIndexNodeSize(builder, index_node_size);
    Header.AddHasTM(builder, hasTM);
    Header.AddHasT(builder, hasT);
    Header.AddHasM(builder, hasM);
    Header.AddHasZ(builder, hasZ);
    Header.AddGeometryType(builder, geometry_type);
    return Header.EndHeader(builder);
  }

  public static void StartHeader(FlatBufferBuilder builder) { builder.StartObject(11); }
  public static void AddName(FlatBufferBuilder builder, StringOffset nameOffset) { builder.AddOffset(0, nameOffset.Value, 0); }
  public static void AddEnvelope(FlatBufferBuilder builder, VectorOffset envelopeOffset) { builder.AddOffset(1, envelopeOffset.Value, 0); }
  public static VectorOffset CreateEnvelopeVector(FlatBufferBuilder builder, double[] data) { builder.StartVector(8, data.Length, 8); for (int i = data.Length - 1; i >= 0; i--) builder.AddDouble(data[i]); return builder.EndVector(); }
  public static VectorOffset CreateEnvelopeVectorBlock(FlatBufferBuilder builder, double[] data) { builder.StartVector(8, data.Length, 8); builder.Add(data); return builder.EndVector(); }
  public static void StartEnvelopeVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(8, numElems, 8); }
  public static void AddGeometryType(FlatBufferBuilder builder, GeometryType geometryType) { builder.AddByte(2, (byte)geometryType, 0); }
  public static void AddHasZ(FlatBufferBuilder builder, bool hasZ) { builder.AddBool(3, hasZ, false); }
  public static void AddHasM(FlatBufferBuilder builder, bool hasM) { builder.AddBool(4, hasM, false); }
  public static void AddHasT(FlatBufferBuilder builder, bool hasT) { builder.AddBool(5, hasT, false); }
  public static void AddHasTM(FlatBufferBuilder builder, bool hasTM) { builder.AddBool(6, hasTM, false); }
  public static void AddColumns(FlatBufferBuilder builder, VectorOffset columnsOffset) { builder.AddOffset(7, columnsOffset.Value, 0); }
  public static VectorOffset CreateColumnsVector(FlatBufferBuilder builder, Offset<Column>[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset CreateColumnsVectorBlock(FlatBufferBuilder builder, Offset<Column>[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static void StartColumnsVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static void AddFeaturesCount(FlatBufferBuilder builder, ulong featuresCount) { builder.AddUlong(8, featuresCount, 0); }
  public static void AddIndexNodeSize(FlatBufferBuilder builder, ushort indexNodeSize) { builder.AddUshort(9, indexNodeSize, 16); }
  public static void AddCrs(FlatBufferBuilder builder, Offset<Crs> crsOffset) { builder.AddOffset(10, crsOffset.Value, 0); }
  public static Offset<Header> EndHeader(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<Header>(o);
  }
  public static void FinishHeaderBuffer(FlatBufferBuilder builder, Offset<Header> offset) { builder.Finish(offset.Value); }
  public static void FinishSizePrefixedHeaderBuffer(FlatBufferBuilder builder, Offset<Header> offset) { builder.FinishSizePrefixed(offset.Value); }
};


}
