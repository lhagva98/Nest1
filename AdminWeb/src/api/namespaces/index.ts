export namespace payloads {
  export interface Admin {
    _id: string;
    active: boolean;
    email: string;
    name: string;
    dateCreated: string;
  }

  export interface CategoryList {
    _id: string;
    phone: string;
    name: string;
    //  cardCount: Number;
  }
}
