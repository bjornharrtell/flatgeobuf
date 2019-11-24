import { flatbuffers } from 'flatbuffers'
import { GeometryType } from '../header_generated'
import { Feature, Geometry } from '../feature_generated'

import { IParsedGeometry, flat, pairFlatCoordinates, toGeometryType } from '../generic/geometry'

export interface IGeoJsonGeometry {
    type: string
    coordinates: number[] | number[][] | number[][][] | number[][][][]
    geometries: IGeoJsonGeometry[]
}

export function buildGeometry(builder: flatbuffers.Builder, geometry: IGeoJsonGeometry) {
    return buildGeometry2(builder, parseGeometry(geometry))
}

export function buildGeometry2(builder: flatbuffers.Builder, parsedGeometry: IParsedGeometry) {
    const { xy, ends, lengths, parts, types } = parsedGeometry

    if (parts) {
        const partOffsets = parts.map(part => buildGeometry2(builder, part))
        const partsOffset = Geometry.createPartsVector(builder, partOffsets)
        const typesOffset = Geometry.createTypesVector(builder, types)
        Geometry.start(builder)
        Geometry.addParts(builder, partsOffset)
        Geometry.addTypes(builder, typesOffset)
        return Geometry.end(builder)
    }

    const coordsOffset = Geometry.createXyVector(builder, xy)

    let endsOffset: number = null
    let lengthsOffset: number = null
    if (ends)
        endsOffset = Geometry.createEndsVector(builder, ends)
    if (lengths)
        lengthsOffset = Geometry.createLengthsVector(builder, lengths)

    Geometry.start(builder)
    if (endsOffset)
        Geometry.addEnds(builder, endsOffset)
    if (lengthsOffset)
        Geometry.addLengths(builder, lengthsOffset)
    Geometry.addXy(builder, coordsOffset)
    return Geometry.end(builder)
}

function parseGeometry(geometry: IGeoJsonGeometry) {
    const cs = geometry.coordinates
    let xy: number[] = null
    let ends: number[] = null
    let lengths: number[] = null
    let parts: IParsedGeometry[] = null
    let types: GeometryType[] = null
    let end = 0
    switch (geometry.type) {
        case 'Point':
            xy = cs as number[]
            break
        case 'MultiPoint':
        case 'LineString':
            xy = flat(cs as number[][])
            break
        case 'MultiLineString':
        case 'Polygon':
            const css = cs as number[][][]
            xy = flat(css)
            if (css.length > 1)
                ends = css.map(c => end += c.length)
            break
        case 'MultiPolygon':
            const csss = cs as number[][][][]
            xy = flat(csss)
            if (csss.length > 1) {
                lengths = csss.map(c => c.length)
                ends = flat(csss.map(cc => cc.map(c => end += c.length)))
            } else
                if (csss[0].length > 1)
                    ends = csss[0].map(c => end += c.length)
            break
        case 'GeometryCollection':
            parts = geometry.geometries.map(parseGeometry)
            types = geometry.geometries.map(g => toGeometryType(g.type))
    }
    return {
        xy,
        ends,
        lengths,
        parts,
        types
    } as IParsedGeometry
}

function extractParts(xy: Float64Array, ends: Uint32Array) {
    if (!ends)
        return [pairFlatCoordinates(xy)]
    let s = 0
    let xySlices = Array.from(ends)
        .map(e => xy.slice(s, s = e << 1))
    return xySlices
        .map(cs => pairFlatCoordinates(cs))
}

function extractPartsParts(
        xy: Float64Array,
        ends: Uint32Array,
        lengths: Uint32Array) {
    if (!lengths)
        return [extractParts(xy, ends)]
    let s = 0
    let xySlices = Array.from(ends)
        .map(e => xy.slice(s, s = e << 1))
    s = 0
    return Array.from(lengths)
        .map(e => xySlices.slice(s, s += e)
        .map(cs => pairFlatCoordinates(cs)))
}

function toGeoJsonCoordinates(geometry: Geometry, type: GeometryType) {
    const xy = geometry.xyArray()
    switch (type) {
        case GeometryType.Point:
            return Array.from(xy)
        case GeometryType.MultiPoint:
        case GeometryType.LineString:
            return pairFlatCoordinates(xy)
        case GeometryType.MultiLineString:
            return extractParts(xy, geometry.endsArray())
        case GeometryType.Polygon:
            return extractParts(xy, geometry.endsArray())
        case GeometryType.MultiPolygon:
            return extractPartsParts(xy,
                geometry.endsArray(),
                geometry.lengthsArray())
    }
}

export function fromGeometry(geometry: Geometry, type: GeometryType) {
    if (type == GeometryType.GeometryCollection) {
        const geometries = []
        for (let i = 0; i < geometry.partsLength(); i++)
            geometries.push(fromGeometry(geometry.parts(i), geometry.types(i)))
        return {
            type: GeometryType[type],
            geometries
        }
    }
    const coordinates = toGeoJsonCoordinates(geometry, type)
    return {
        type: GeometryType[type],
        coordinates,
    } as IGeoJsonGeometry
}