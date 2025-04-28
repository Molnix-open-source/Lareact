export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
};

export type InputProp = {
    label?: string;
    wide?: boolean;
    name: string;
    errorMessage?: string | null;
};

export type AppState = {
    user: User | null;
    loading: boolean;
    loadUser: () => void;
    logout: () => void;
    redirectIfLoggedIn: () => void;
};
