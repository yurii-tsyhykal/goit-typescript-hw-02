export type onHandleSubmit = (values: string) => void;
export type openModal = (url: string, alt: string) => void;
export type LoadMore = () => void;
export type closeModal = () => void;

export interface Urls {
    small: string;
    regular: string;
}

export interface Image {
    id: string;
    alt_description: string;
    urls: Urls;
}

export interface FetchResponse {
    results: Image[];
    total: number;
}


