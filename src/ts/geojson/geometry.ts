import { flatbuffers } from 'flatbuffers'
import { GeometryType } from '../header_generated'
import { Feature  } from '../feature_generated'


export interface IGeoJsonGeometry {
    type: string
    coordinates: number[] | number[][] | number[][][] | number[][][][]
}

export function buildGeometry(builder: flatbuffers.Builder, geometry: IGeoJsonGeometry) {
    const { coords, lengths, ringLengths, ringCounts } = parseGeometry(geometry)
    const coordsOffset = Feature.createCoordsVector(builder, coords)

    let lengthsOffset: number = null
    let ringLengthsOffset: number = null
    let ringCountsOffset: number = null
    if (lengths)
        lengthsOffset = Feature.createLengthsVector(builder, lengths)
    if (ringLengths)
        ringLengthsOffset = Feature.createRingLengthsVector(builder, ringLengths)
    if (ringCounts)
        ringCountsOffset = Feature.createRingCountsVector(builder, ringCounts)

    return function() {
        if (lengthsOffset)
            Feature.addLengths(builder, lengthsOffset)
        if (ringLengths)
            Feature.addRingLengths(builder, ringLengthsOffset)
        if (ringCounts)
            Feature.addRingCounts(builder, ringCountsOffset)
        Feature.addCoords(builder, coordsOffset)
    }
}

interface IParsedGeometry {
    coords: number[],
    lengths: number[],
    ringLengths: number[],
    ringCounts: number[]
}

function flat(a: any[]): number[] {
    return a.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val), [])
}

function parseGeometry(geometry: IGeoJsonGeometry) {
    const cs = geometry.coordinates
    let coords: number[] = null
    let lengths: number[] = null
    let ringLengths: number[] = null
    let ringCounts: number[] = null
    switch (geometry.type) {
        case 'Point': {
            coords = cs as number[]
            break
        }
        case 'MultiPoint':
        case 'LineString': {
            coords = flat(cs as number[][])
            break
        }
        case 'MultiLineString': {
            const css = cs as number[][][]
            coords = flat(css)
            if (css.length > 1)
                lengths = css.map(c => c.length * 2)
            break
        }
        case 'Polygon': {
            const css = cs as number[][][]
            coords = flat(css)
            if (css.length > 1)
                ringLengths = css.map(c => c.length * 2)
            break
        }
        case 'MultiPolygon': {
            const csss = cs as number[][][][]
            coords = flat(csss)
            if (csss.length > 1) {
                lengths = csss.map(cc => cc.map(c => c.length * 2).reduce((a, b) => a + b, 0))
                ringCounts = csss.map(c => c.length)
                ringLengths = flat(csss.map(cc => cc.map(c => c.length * 2)))
            } else
                if (csss[0].length > 1)
                    ringLengths = csss[0].map(c => c.length * 2)
            break
        }
    }
    return {
        coords,
        lengths,
        ringLengths,
        ringCounts,
    } as IParsedGeometry
}

function pairFlatCoordinates(coordinates: Float64Array) {
    const newArray: number[][] = []
    for (let i = 0; i < coordinates.length; i += 2)
        newArray.push([coordinates[i], coordinates[i + 1]])
    return newArray
}

function extractParts(coords: Float64Array, lengths: Uint32Array) {
    if (!lengths)
        return [pairFlatCoordinates(coords)]
    const parts = []
    let offset = 0
    for (const length of lengths) {
        const slice = coords.slice(offset, offset + length)
        parts.push(pairFlatCoordinates(slice))
        offset += length
    }
    return parts
}

function extractPartsParts(
        coords: Float64Array,
        lengths: Uint32Array,
        ringLengths: Uint32Array,
        ringCounts: Uint32Array) {
    if (!lengths)
        return [extractParts(coords, ringLengths)]
    const parts = []
    let offset = 0
    let ringLengthsOffset = 0
    for (let i = 0; i < lengths.length; i++) {
        const length = lengths[i]
        const ringCount = ringCounts[i]
        const slice = coords.slice(offset, offset + length)
        const ringLengthsSlice = ringLengths.slice(ringLengthsOffset, ringLengthsOffset + ringCount)
        parts.push(extractParts(slice, ringLengthsSlice))
        offset += length
        ringLengthsOffset += ringCount
    }
    return parts
}

function toGeoJsonCoordinates(feature: Feature, type: GeometryType) {
    // NOTE: workaround for alignment issues
    /*const coordsLength = geometry.coordsLength()
    const coords = new Float64Array(coordsLength)
    for (let i = 0; i < coordsLength; i++)
        coords[i] = geometry.coords(i)*/
    const coords = feature.coordsArray()
    switch (type) {
        case GeometryType.Point:
            return Array.from(coords)
        case GeometryType.MultiPoint:
        case GeometryType.LineString:
            return pairFlatCoordinates(coords)
        case GeometryType.MultiLineString:
            return extractParts(coords, feature.lengthsArray())
        case GeometryType.Polygon:
            return extractParts(coords, feature.ringLengthsArray())
        case GeometryType.MultiPolygon:
            return extractPartsParts(coords,
                feature.lengthsArray(),
                feature.ringLengthsArray(),
                feature.ringCountsArray())
    }
}

export function fromGeometry(feature: Feature, type: GeometryType) {
    const coordinates = toGeoJsonCoordinates(feature, type)
    return {
        type: GeometryType[type],
        coordinates,
    } as IGeoJsonGeometry
}

export function toGeometryType(name: string) {
    const type: GeometryType = (GeometryType as any)[name]
    return type
}
