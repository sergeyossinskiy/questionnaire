export class StringUtility {

    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static snakeToCamel(str){
        return str.replace( /([-_][a-z])/g, (group) => group.toUpperCase()
                                                    .replace('-', '')
                                                    .replace('_', ''));
    }

    static snakeToPascal(str){
        return StringUtility.snakeToCamel(str).replace( /\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1));
    }
}