export default function translateFilter(value, locale){
    if (value) return JSON.parse(value)[ locale ];
    return "...";
}