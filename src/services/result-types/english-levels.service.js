export class EnglishLevelsService {

    pointsMap = {
        'A1': {"start": 0, "end": 17},
        'A2': {"start": 18, "end": 33},
        'B1': {"start": 34, "end": 50},
        'B2': {"start": 51, "end": 67},
        'C1': {"start": 68, "end": 84},
        'C2': {"start": 85, "end": 100}
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