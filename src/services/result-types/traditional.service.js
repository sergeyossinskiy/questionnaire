export class TraditionalService {
    pointsMap = {};

    constructor($t) {
        this.pointsMap[$t('marks.traditional.fine')] = {"start": 90, "end": 100};
        this.pointsMap[$t('marks.traditional.good')] = {"start": 70, "end": 89};
        this.pointsMap[$t('marks.traditional.satisfactorily')] = {"start": 50, "end": 69};
        this.pointsMap[$t('marks.traditional.unsatisfactory')] = {"start": 0, "end": 49};
    }

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