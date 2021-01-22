import { Movie } from "./movie";
import { Screening } from "./screening";

export class MovieAndScreening {
    constructor(
        public movie?: Movie,
        public screening?: Screening,
    ) {}
}
