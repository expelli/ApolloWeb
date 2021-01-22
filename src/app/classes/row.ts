import { Category } from "./category";
import { Seat } from "./seat";

export class Row {
    constructor(public hallId?: number, public rowNumber?: number, public priceCategoryId?: number, public priceCategory?: Category, public seats?: Seat[]){}
}
