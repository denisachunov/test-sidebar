export const timestampToDate = timestamp => {
    const date = new Date ( timestamp * 1000 );
    const localeDate = date.toLocaleString (
        'en-US',
        {
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute:'2-digit'
        }
    ).split ( ',' );
    return {
        date: localeDate.length > 1 ? localeDate[0] : 'error',
        time: localeDate.length > 1 ? localeDate[1] : 'error'
    };
}