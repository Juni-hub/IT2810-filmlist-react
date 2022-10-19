export interface Film {
    _id: string,
    title: string,
    year: string,
    cast: string[],
    genres: string[]
}

export interface Values {
    title: string;
    description: string;
    modifier: string;
}
  
export interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

export interface CollectionCreateFilmProps {
    film: Film;
    open: boolean;
    onCancel: () => void;
}