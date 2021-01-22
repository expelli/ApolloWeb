import { Hall } from "./hall";
import { Movie } from "./movie";

export class Screening {
    constructor(
        public id: number,
        public movieId: number,
        public hallId: number,
        public hall: Hall,
        public startTime: Date,
        public movie: Movie,  
    ){

    }
}
