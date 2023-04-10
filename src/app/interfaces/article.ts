export interface Article {
  ID?: string;
  title?: string;
  summary?: string;
  unitPriceExcludingTaxes?: number;
  unitPriceIncludingTaxes?: number;
  sold: number;
  bookEditor?: string;
  bookTypes?: string[];
  bookAuthor?: {
    firstname?: string;
    lastname?: string;
    language?: string;
  }[];
  image?: string;
}
