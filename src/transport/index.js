import { DATA_URL, Response } from '../const';

export default async order => {
    let result = [];
    const response = await fetch ( DATA_URL );
    if ( response.status === Response.OK ) {
        const responseJson = await response.json();
        const sort = order === 'DESC' ? 1 : -1;
        result = responseJson.sort (( a, b ) => sort * ( b.updated - a.updated ));
    }
    return result;
}