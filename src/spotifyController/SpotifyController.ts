import * as fs from 'fs';

export class SpotifyController {
    token: string;

    constructor() {
        this.token = fs.readFileSync('./spotifytoken.txt', 'utf-8');
    }




}
