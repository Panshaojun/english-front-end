import Model from '@/api/utils/model';
export type ReviewData = {
    id: number,
} & Review
export type  Review= {
    date: string,
    ids: number[]
}
const ReviewModel = new Model('review');

export const create = (data: Review) => {
    return ReviewModel.create<ReviewData>(data)
}

export const findAll = ()=>ReviewModel.findWhere<ReviewData[]>({limit:5500})