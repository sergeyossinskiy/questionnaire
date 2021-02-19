export class GpaService {

    pointsMap = {
        '4': {"start": 95, "end": 100},
        '3,67': {"start": 90, "end": 94},
        '3,33': {"start": 85, "end": 89},
        '3': {"start": 80, "end": 84},
        '2,67': {"start": 75, "end": 79},
        '2,33': {"start": 70, "end": 74},
        '2': {"start": 65, "end": 69},
        '1,67': {"start": 60, "end": 64},
        '1,33': {"start": 55, "end": 59},
        '1': {"start": 50, "end": 54},
        '0,5': {"start": 25, "end": 49},
        '0': {"start": 0, "end": 24}
    };
    
    constructor() {}

    getResult(result, count_questions) {
        let point = Math.round( 100/count_questions*result );
        let mark = '';

        Object.keys(this.pointsMap).forEach((value) => {
            let level = this.pointsMap[value];
            if (point >= level.start && point <= level.end) {
                mark = value;
            }
        });

        return mark;
    }
}  