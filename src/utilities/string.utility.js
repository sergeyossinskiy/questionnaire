export class StringUtility {

    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}