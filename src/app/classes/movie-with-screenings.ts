import { Movie } from "./movie";
import { Screening } from "./screening";
import { ScreeningFreeSeats } from "./screening-free-seats";

export class MovieWithScreenings {
    constructor(
       public movie: Movie,
       public screenings: ScreeningFreeSeats[]
       ){}
}

