package org.wololo.flatgeobuf.geotools;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.*;

import com.google.flatbuffers.ByteBufferUtil;
import com.google.flatbuffers.FlatBufferBuilder;
import static com.google.flatbuffers.Constants.SIZE_PREFIX_LENGTH;

import org.wololo.flatgeobuf.generated.*;

import org.geotools.data.memory.MemoryFeatureCollection;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.locationtech.jts.geom.*;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.feature.type.AttributeDescriptor;
import org.opengis.feature.type.GeometryDescriptor;
//import org.opengis.referencing.crs.CoordinateReferenceSystem;

public class FeatureCollectionConversions {
    static byte[] magicbytes = new byte[] { 0x66, 0x67, 0x62, 0x02, 0x66, 0x67, 0x62, 0x00 };

    public static void serialize(SimpleFeatureCollection featureCollection, long featuresCount,
            OutputStream outputStream) throws IOException {
        if (featuresCount == 0)
            return;

        SimpleFeatureType featureType = featureCollection.getSchema();

        List<AttributeDescriptor> types = featureType.getAttributeDescriptors();
        List<ColumnMeta> columns = new ArrayList<ColumnMeta>();

        for (int i = 0; i < types.size(); i++) {
            AttributeDescriptor ad = types.get(i);
            if (ad instanceof GeometryDescriptor) {
                // multiple geometries per feature is not supported
            } else {
                String key = ad.getLocalName();
                Class<?> binding = ad.getType().getBinding();
                ColumnMeta column = new ColumnMeta();
                column.name = key;
                if (binding.isAssignableFrom(Boolean.class))
                    column.type = ColumnType.Bool;
                else if (binding.isAssignableFrom(Integer.class))
                    column.type = ColumnType.Int;
                else if (binding.isAssignableFrom(Long.class))
                    column.type = ColumnType.Long;
                else if (binding.isAssignableFrom(Double.class))
                    column.type = ColumnType.Double;
                else if (binding.isAssignableFrom(String.class))
                    column.type = ColumnType.String;
                else
                    throw new RuntimeException("Unknown type");
                columns.add(column);
            }
        }

        //CoordinateReferenceSystem crs = featureType.getGeometryDescriptor().getCoordinateReferenceSystem();
        byte geometryType = toGeometryType(featureType.getGeometryDescriptor().getType().getBinding());
        //byte dimensions = (byte) (crs == null ? 2 : crs.getCoordinateSystem().getDimension());

        outputStream.write(magicbytes);

        HeaderMeta headerMeta = new HeaderMeta();
        headerMeta.featuresCount = featuresCount;
        headerMeta.geometryType = geometryType;
        headerMeta.columns = columns;

        byte[] headerBuffer = buildHeader(headerMeta);
        outputStream.write(headerBuffer);

        try (FeatureIterator<SimpleFeature> iterator = featureCollection.features()) {
            while (iterator.hasNext()) {
                SimpleFeature feature = iterator.next();
                byte[] featureBuffer = FeatureConversions.serialize(feature, headerMeta);
                outputStream.write(featureBuffer);
            }
        }
    }

    public static SimpleFeatureCollection deserialize(ByteBuffer bb) {
        int offset = 0;
        if (bb.get() != magicbytes[0] || bb.get() != magicbytes[1] || bb.get() != magicbytes[2]
                || bb.get() != magicbytes[3] || bb.get() != magicbytes[4] || bb.get() != magicbytes[5]
                || bb.get() != magicbytes[6] || bb.get() != magicbytes[7])
            throw new RuntimeException("Not a FlatGeobuf file");
        bb.position(offset += magicbytes.length);
        int headerSize = ByteBufferUtil.getSizePrefix(bb);
        bb.position(offset += SIZE_PREFIX_LENGTH);
        Header header = Header.getRootAsHeader(bb);
        bb.position(offset += headerSize);
        int geometryType = header.geometryType();
        Class<?> geometryClass;
        switch (geometryType) {
        case GeometryType.Point:
            geometryClass = Point.class;
            break;
        case GeometryType.MultiPoint:
            geometryClass = MultiPoint.class;
            break;
        case GeometryType.LineString:
            geometryClass = LineString.class;
            break;
        case GeometryType.MultiLineString:
            geometryClass = MultiLineString.class;
            break;
        case GeometryType.Polygon:
            geometryClass = Polygon.class;
            break;
        case GeometryType.MultiPolygon:
            geometryClass = MultiPolygon.class;
            break;
        default:
            throw new RuntimeException("Unknown geometry type");
        }

        int columnsLength = header.columnsLength();
        ArrayList<ColumnMeta> columnMetas = new ArrayList<ColumnMeta>();
        for (int i = 0; i < columnsLength; i++) {
            ColumnMeta columnMeta = new ColumnMeta();
            columnMeta.name = header.columns(i).name();
            columnMeta.type = (byte) header.columns(i).type();
            columnMetas.add(columnMeta);
        }

        HeaderMeta headerMeta = new HeaderMeta();
        headerMeta.columns = columnMetas;
        headerMeta.geometryType = (byte) geometryType;

        SimpleFeatureTypeBuilder ftb = new SimpleFeatureTypeBuilder();
        ftb.setName("testType");
        ftb.add("geometryProperty", geometryClass);
        for (ColumnMeta columnMeta : columnMetas)
            ftb.add(columnMeta.name, columnMeta.getBinding());
        SimpleFeatureType ft = ftb.buildFeatureType();
        SimpleFeatureBuilder fb = new SimpleFeatureBuilder(ft);
        MemoryFeatureCollection fc = new MemoryFeatureCollection(ft);
        while (bb.hasRemaining()) {
            int featureSize = ByteBufferUtil.getSizePrefix(bb);
            bb.position(offset += SIZE_PREFIX_LENGTH);
            Feature feature = Feature.getRootAsFeature(bb);
            bb.position(offset += featureSize);
            SimpleFeature f = FeatureConversions.deserialize(feature, fb, headerMeta);
            fc.add(f);
        }
        return fc;
    }

    private static byte toGeometryType(Class<?> geometryClass) {
        if (geometryClass.isAssignableFrom(MultiPoint.class))
            return GeometryType.MultiPoint;
        else if (geometryClass.isAssignableFrom(Point.class))
            return GeometryType.Point;
        else if (geometryClass.isAssignableFrom(MultiLineString.class))
            return GeometryType.MultiLineString;
        else if (geometryClass.isAssignableFrom(LineString.class))
            return GeometryType.LineString;
        else if (geometryClass.isAssignableFrom(MultiPolygon.class))
            return GeometryType.MultiPolygon;
        else if (geometryClass.isAssignableFrom(Polygon.class))
            return GeometryType.Polygon;
        else
            throw new RuntimeException("Unknown geometry type");
    }

    private static byte[] buildHeader(HeaderMeta headerMeta) {
        FlatBufferBuilder builder = new FlatBufferBuilder(1024);

        int[] columnsArray = headerMeta.columns.stream().mapToInt(c -> {
            int nameOffset = builder.createString(c.name);
            int type = c.type;
            return Column.createColumn(builder, nameOffset, type);
        }).toArray();
        int columnsOffset = Header.createColumnsVector(builder, columnsArray);

        Header.startHeader(builder);
        Header.addGeometryType(builder, headerMeta.geometryType);        
        Header.addIndexNodeSize(builder, 0);
        Header.addColumns(builder, columnsOffset);
        Header.addFeaturesCount(builder, headerMeta.featuresCount);
        int offset = Header.endHeader(builder);

        builder.finishSizePrefixed(offset);

        return builder.sizedByteArray();
    }
}