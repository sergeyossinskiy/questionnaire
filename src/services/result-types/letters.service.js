export class LettersService {

    pointsMap = {
        'A': {"start": 95, "end": 100},
        'A-': {"start": 90, "end": 94},
        'B+': {"start": 85, "end": 89},
        'B': {"start": 80, "end": 84},
        'B-': {"start": 75, "end": 79},
        'C+': {"start": 70, "end": 74},
        'C': {"start": 65, "end": 69},
        'C-': {"start": 60, "end": 64},
        'D+': {"start": 55, "end": 59},
        'D': {"start": 50, "end": 54},
        'FX': {"start": 25, "end": 49},
        'F': {"start": 0, "end": 24}
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