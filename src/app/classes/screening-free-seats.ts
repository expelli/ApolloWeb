import { Screening } from "./screening";

export class ScreeningFreeSeats {
    constructor(
        public screening: Screening,
        public totalSeats: number,
        public freeSeats: number
    ){}
}
