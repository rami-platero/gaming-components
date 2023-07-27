export interface GoogleUser {
    id:          string;
    displayName: string;
    name:        Name;
    emails:      Email[];
    photos:      Photo[];
    provider:    string;
    _raw:        string;
    _json:       JSON;
}

export interface JSON {
    sub:            string;
    name:           string;
    given_name:     string;
    picture:        string;
    email:          string;
    email_verified: boolean;
    locale:         string;
}

export interface Email {
    value:    string;
    verified: boolean;
}

export interface Name {
    givenName: string;
}

export interface Photo {
    value: string;
}

export interface DecodedToken {
    id: number;
    iat: number;
    exp: number;
}

interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date,
    updatedAt: Date
  }

declare global {
    namespace Express {
      interface Request {
        user?: IUser 
      }
    }
}