import {
    serialize,
    deserialize as genericDeserialize,
    deserializeStream as genericDeserializeStream } from '../generic/featurecollection'
import { IFeature } from '../generic/feature'
import { createGeometryOl } from './geometry'
import { createFeatureOl } from './feature'
import { ISimpleGeometry } from '../generic/geometry'
import { GeometryType } from '../header_generated'
import { Feature, Geometry } from '../feature_generated'

export { serialize as serialize }

export function deserialize(bytes: Uint8Array, ol: any): IFeature[] {
    function createFeature(geometry: ISimpleGeometry, properties: any) {
        return createFeatureOl(geometry, properties, ol)
    }
    function createGeometry(geometry: Geometry, type: GeometryType) {
        return createGeometryOl(geometry, type, ol)
    }
    return genericDeserialize(bytes, createGeometry, createFeature)
}

export function deserializeStream(stream: any, ol: any) {
    function createFeature(geometry: ISimpleGeometry, properties: any) {
        return createFeatureOl(geometry, properties, ol)
    }
    function createGeometry(geometry: Geometry, type: GeometryType) {
        return createGeometryOl(geometry, type, ol)
    }
    return genericDeserializeStream(stream, createGeometry, createFeature)
}