import Skeleton from './skeleton';


type RefSkeleton = typeof Skeleton;

export interface SkeletonComponent extends RefSkeleton {
    displayName: string;
}

const SkeletonComp: SkeletonComponent = Skeleton as SkeletonComponent;

SkeletonComp.displayName = 'ShineoutSkeleton';

export default SkeletonComp;
