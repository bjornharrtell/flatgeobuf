package org.wololo.flatgeobuf.generated;
// automatically generated by the FlatBuffers compiler, do not modify

import java.nio.*;
import java.lang.*;
import java.util.*;
import com.google.flatbuffers.*;

@SuppressWarnings("unused")
public final class Header extends Table {
  public static void ValidateVersion() { Constants.FLATBUFFERS_1_12_0(); }
  public static Header getRootAsHeader(ByteBuffer _bb) { return getRootAsHeader(_bb, new Header()); }
  public static Header getRootAsHeader(ByteBuffer _bb, Header obj) { _bb.order(ByteOrder.LITTLE_ENDIAN); return (obj.__assign(_bb.getInt(_bb.position()) + _bb.position(), _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __reset(_i, _bb); }
  public Header __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public String name() { int o = __offset(4); return o != 0 ? __string(o + bb_pos) : null; }
  public ByteBuffer nameAsByteBuffer() { return __vector_as_bytebuffer(4, 1); }
  public ByteBuffer nameInByteBuffer(ByteBuffer _bb) { return __vector_in_bytebuffer(_bb, 4, 1); }
  public double envelope(int j) { int o = __offset(6); return o != 0 ? bb.getDouble(__vector(o) + j * 8) : 0; }
  public int envelopeLength() { int o = __offset(6); return o != 0 ? __vector_len(o) : 0; }
  public DoubleVector envelopeVector() { return envelopeVector(new DoubleVector()); }
  public DoubleVector envelopeVector(DoubleVector obj) { int o = __offset(6); return o != 0 ? obj.__assign(__vector(o), bb) : null; }
  public ByteBuffer envelopeAsByteBuffer() { return __vector_as_bytebuffer(6, 8); }
  public ByteBuffer envelopeInByteBuffer(ByteBuffer _bb) { return __vector_in_bytebuffer(_bb, 6, 8); }
  public int geometryType() { int o = __offset(8); return o != 0 ? bb.get(o + bb_pos) & 0xFF : 0; }
  public boolean hasZ() { int o = __offset(10); return o != 0 ? 0!=bb.get(o + bb_pos) : false; }
  public boolean hasM() { int o = __offset(12); return o != 0 ? 0!=bb.get(o + bb_pos) : false; }
  public boolean hasT() { int o = __offset(14); return o != 0 ? 0!=bb.get(o + bb_pos) : false; }
  public boolean hasTM() { int o = __offset(16); return o != 0 ? 0!=bb.get(o + bb_pos) : false; }
  public Column columns(int j) { return columns(new Column(), j); }
  public Column columns(Column obj, int j) { int o = __offset(18); return o != 0 ? obj.__assign(__indirect(__vector(o) + j * 4), bb) : null; }
  public int columnsLength() { int o = __offset(18); return o != 0 ? __vector_len(o) : 0; }
  public Column.Vector columnsVector() { return columnsVector(new Column.Vector()); }
  public Column.Vector columnsVector(Column.Vector obj) { int o = __offset(18); return o != 0 ? obj.__assign(__vector(o), 4, bb) : null; }
  public long featuresCount() { int o = __offset(20); return o != 0 ? bb.getLong(o + bb_pos) : 0L; }
  public int indexNodeSize() { int o = __offset(22); return o != 0 ? bb.getShort(o + bb_pos) & 0xFFFF : 16; }
  public Crs crs() { return crs(new Crs()); }
  public Crs crs(Crs obj) { int o = __offset(24); return o != 0 ? obj.__assign(__indirect(o + bb_pos), bb) : null; }
  public String title() { int o = __offset(26); return o != 0 ? __string(o + bb_pos) : null; }
  public ByteBuffer titleAsByteBuffer() { return __vector_as_bytebuffer(26, 1); }
  public ByteBuffer titleInByteBuffer(ByteBuffer _bb) { return __vector_in_bytebuffer(_bb, 26, 1); }
  public String description() { int o = __offset(28); return o != 0 ? __string(o + bb_pos) : null; }
  public ByteBuffer descriptionAsByteBuffer() { return __vector_as_bytebuffer(28, 1); }
  public ByteBuffer descriptionInByteBuffer(ByteBuffer _bb) { return __vector_in_bytebuffer(_bb, 28, 1); }
  public String metadata() { int o = __offset(30); return o != 0 ? __string(o + bb_pos) : null; }
  public ByteBuffer metadataAsByteBuffer() { return __vector_as_bytebuffer(30, 1); }
  public ByteBuffer metadataInByteBuffer(ByteBuffer _bb) { return __vector_in_bytebuffer(_bb, 30, 1); }

  public static int createHeader(FlatBufferBuilder builder,
      int nameOffset,
      int envelopeOffset,
      int geometry_type,
      boolean hasZ,
      boolean hasM,
      boolean hasT,
      boolean hasTM,
      int columnsOffset,
      long features_count,
      int index_node_size,
      int crsOffset,
      int titleOffset,
      int descriptionOffset,
      int metadataOffset) {
    builder.startTable(14);
    Header.addFeaturesCount(builder, features_count);
    Header.addMetadata(builder, metadataOffset);
    Header.addDescription(builder, descriptionOffset);
    Header.addTitle(builder, titleOffset);
    Header.addCrs(builder, crsOffset);
    Header.addColumns(builder, columnsOffset);
    Header.addEnvelope(builder, envelopeOffset);
    Header.addName(builder, nameOffset);
    Header.addIndexNodeSize(builder, index_node_size);
    Header.addHasTM(builder, hasTM);
    Header.addHasT(builder, hasT);
    Header.addHasM(builder, hasM);
    Header.addHasZ(builder, hasZ);
    Header.addGeometryType(builder, geometry_type);
    return Header.endHeader(builder);
  }

  public static void startHeader(FlatBufferBuilder builder) { builder.startTable(14); }
  public static void addName(FlatBufferBuilder builder, int nameOffset) { builder.addOffset(0, nameOffset, 0); }
  public static void addEnvelope(FlatBufferBuilder builder, int envelopeOffset) { builder.addOffset(1, envelopeOffset, 0); }
  public static int createEnvelopeVector(FlatBufferBuilder builder, double[] data) { builder.startVector(8, data.length, 8); for (int i = data.length - 1; i >= 0; i--) builder.addDouble(data[i]); return builder.endVector(); }
  public static void startEnvelopeVector(FlatBufferBuilder builder, int numElems) { builder.startVector(8, numElems, 8); }
  public static void addGeometryType(FlatBufferBuilder builder, int geometryType) { builder.addByte(2, (byte)geometryType, (byte)0); }
  public static void addHasZ(FlatBufferBuilder builder, boolean hasZ) { builder.addBoolean(3, hasZ, false); }
  public static void addHasM(FlatBufferBuilder builder, boolean hasM) { builder.addBoolean(4, hasM, false); }
  public static void addHasT(FlatBufferBuilder builder, boolean hasT) { builder.addBoolean(5, hasT, false); }
  public static void addHasTM(FlatBufferBuilder builder, boolean hasTM) { builder.addBoolean(6, hasTM, false); }
  public static void addColumns(FlatBufferBuilder builder, int columnsOffset) { builder.addOffset(7, columnsOffset, 0); }
  public static int createColumnsVector(FlatBufferBuilder builder, int[] data) { builder.startVector(4, data.length, 4); for (int i = data.length - 1; i >= 0; i--) builder.addOffset(data[i]); return builder.endVector(); }
  public static void startColumnsVector(FlatBufferBuilder builder, int numElems) { builder.startVector(4, numElems, 4); }
  public static void addFeaturesCount(FlatBufferBuilder builder, long featuresCount) { builder.addLong(8, featuresCount, 0L); }
  public static void addIndexNodeSize(FlatBufferBuilder builder, int indexNodeSize) { builder.addShort(9, (short)indexNodeSize, (short)16); }
  public static void addCrs(FlatBufferBuilder builder, int crsOffset) { builder.addOffset(10, crsOffset, 0); }
  public static void addTitle(FlatBufferBuilder builder, int titleOffset) { builder.addOffset(11, titleOffset, 0); }
  public static void addDescription(FlatBufferBuilder builder, int descriptionOffset) { builder.addOffset(12, descriptionOffset, 0); }
  public static void addMetadata(FlatBufferBuilder builder, int metadataOffset) { builder.addOffset(13, metadataOffset, 0); }
  public static int endHeader(FlatBufferBuilder builder) {
    int o = builder.endTable();
    return o;
  }
  public static void finishHeaderBuffer(FlatBufferBuilder builder, int offset) { builder.finish(offset); }
  public static void finishSizePrefixedHeaderBuffer(FlatBufferBuilder builder, int offset) { builder.finishSizePrefixed(offset); }

  public static final class Vector extends BaseVector {
    public Vector __assign(int _vector, int _element_size, ByteBuffer _bb) { __reset(_vector, _element_size, _bb); return this; }

    public Header get(int j) { return get(new Header(), j); }
    public Header get(Header obj, int j) {  return obj.__assign(__indirect(__element(j), bb), bb); }
  }
}

