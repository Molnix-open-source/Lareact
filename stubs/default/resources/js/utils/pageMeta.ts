export const pageTitle = (title: string) => {
    document.title = [title, import.meta.env.VITE_APP_NAME].join(" - ");
};
