export interface Article {
    ID?: string;
    title?: string;
    summary?: string;
    unitPriceExcludingTaxes?: number;
    unitPriceIncludingTaxes?: number;
    sold: number;
    image?: Blob;
}
