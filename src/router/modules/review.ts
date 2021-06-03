import {Routes} from '@/router/type';
import Review from '@/pages/review';
import ReviewToday from '@/pages/review-today';
import ReviewAll from '@/pages/review-all';
const rotues:Routes=[
    {
        path:'/review-today',
        component:ReviewToday
    },
    {
        path:'/review',
        component:Review
    },
    {
        path:'/review-all',
        component:ReviewAll
    }
]

export default rotues;