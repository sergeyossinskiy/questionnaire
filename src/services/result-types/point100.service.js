export class Point100Service {
    
    constructor() {}

    getResult(result, count_questions) {
        let points = Math.round( 100/count_questions*result );
        return points;
    }
}  