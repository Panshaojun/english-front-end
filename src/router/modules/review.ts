import {Routes} from '@/router/type';
import ReviewToday from '@/pages/review-today';
import ReviewAll from '@/pages/review-all';
const rotues:Routes=[
    {
        path:'/review-today',
        component:ReviewToday
    },
    {
        path:'/review-all',
        component:ReviewAll
    }
]

export default rotues;