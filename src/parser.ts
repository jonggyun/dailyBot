import axios from 'axios';
import { ArticleProps, ArticleType } from './type';

type ArticleKeys = 'title' | 'url' | 'description';

export const setArticlesToAddMessage = <
  T extends ArticleType
>(articles: Pick<ArticleProps, ArticleKeys>[]) => {
  return articles.reduce<T[]>(
    (pv: any[], cv) => [
      ...pv,
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${cv.url} | ${cv.title.substr(0, 50)}>`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: cv.description.substr(0, 70),
          },
        ],
      },
    ],
    [],
  );
}

export const getAtricle = (articles: ArticleProps[]) => 
  articles
    .splice(0, 10)
    .map((articles: ArticleProps) => ({
      title: articles.title,
      url: articles.url,
      description: articles.description,
    }));

export const getNews = async () => {
  try {
    const { data } = await axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.API_KEY}`,
    );

    console.log('✅ NEWS API call is success.');

    const articles = getAtricle(data.articles);

    return setArticlesToAddMessage(articles);
  } catch (error) {
    console.log('😱 Error has been occured.', error.message);
  }
};