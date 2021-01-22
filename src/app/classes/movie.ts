import { Genre } from "./genre";

export class Movie {
    constructor(
        public id?: number,
        public actors?: string,
        public description?: string,
        public duration?: number,
        public genre?: Genre,
        public genreId?: string,
        public title?: string,
        public trailer?: string,
        public poster?: string
    ){}

}
