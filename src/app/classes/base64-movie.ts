import { Genre } from "./genre";
import { Movie } from "./movie";

export class Base64Movie {
    constructor(
        public movie?: Movie,
        public id?: number,
        public actors?: string,
        public description?: string,
        public duration?: number,
        public genreId?: string,
        public title?: string,
        public trailer?: string,
        public poster?: string
    ){}
}
