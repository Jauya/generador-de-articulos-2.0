import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArticleStore {
  articles: ArticleGemini[];
  addArticle: (articles: ArticleGemini | undefined) => void;
  clearArticles: () => void;
}

export interface ArticleGemini {
  titlePage: string; // Título de la página del artículo
  contentPage: string; // Contenido principal del artículo
  titleSeo: string; // Título SEO para el artículo
  descriptionSeo: string; // Descripción SEO para el artículo
  excerpt: string; // Extracto o resumen del sitio
}

export const useArticleStore = create<ArticleStore>()(
  persist(
    (set) => ({
      articles: [],
      addArticle: (article) => {
        if (article)
          set((state) => ({ articles: [...state.articles, article] }));
      },
      clearArticles: () => set({ articles: [] }),
    }),
    {
      name: "article-storage",
    }
  )
);
