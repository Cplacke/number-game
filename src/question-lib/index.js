import demo from './level-1/demo'

export const LVL_1 = demo.map(q => (
    { ...q, 
        time: 10*1000 ,
        avg: 3000,
        points: 500
    }
))