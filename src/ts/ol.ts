import { IFeature } from './generic/feature';

import {
    deserialize as fcDeserialize,
    deserializeStream as fcDeserializeStream,
    deserializeFiltered as fcDeserializeFiltered,
    serialize as fcSerialize,
} from './ol/featurecollection';
import { HeaderMetaFn } from './generic';
import { Rect } from './packedrtree';

export function serialize(features: IFeature[]): Uint8Array {
    const bytes = fcSerialize(features);
    return bytes;
}

export function deserialize(
    input: Uint8Array | ReadableStream | string,
    rect?: Rect,
    headerMetaFn?: HeaderMetaFn
): AsyncGenerator<IFeature> | IFeature[] {
    if (input instanceof Uint8Array) return fcDeserialize(input, headerMetaFn);
    else if (input instanceof ReadableStream)
        return fcDeserializeStream(input, headerMetaFn);
    else return fcDeserializeFiltered(input, rect as Rect, headerMetaFn);
}
