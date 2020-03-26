export interface ArticleProps {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface MessageSectionProps {
  type: string;
  text: {
    type: string;
    text: string;
  };
}

export interface MessageContextProps {
  type: string;
  elemens: { type: string; text: string }[];
}

export type ArticleType = MessageSectionProps | MessageContextProps;
