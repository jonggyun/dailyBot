import axios from 'axios';

require('dotenv').config();

interface ArticleProps {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const getNews = async () => {
  try {
    const { data } = await axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.API_KEY}`,
    );
    console.log('✅ Calling news api is success.');
    const articles = data.articles
      .splice(0, 10)
      .map((article: ArticleProps) => ({
        title: article.title,
        url: article.url,
        description: article.description,
      }));

    const result = articles.reduce((pv:any, cv: ArticleProps) => {
      return [ ...pv, {
        type: 'section', 
        text: {
          type: 'mrkdwn',
          text: `<${cv.url} | ${cv.title.substr(0, 50)}>`,
        }
      }, {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: cv.description.substr(0, 70),
          }
        ]
      }]
    }, [])
    return result;
  } catch (error) {
    console.log('😱 Error has been occured.', error.message);
  }
};

const sendMessage = async () => {
  try {
    const news = await getNews();
    const date = new Date().toLocaleDateString();
    const webhookApi = process.env.WEBHOOK_URL_SLACK || '';
    const message = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `📰 오늘의 뉴스(${date})`
          }
        },   
        {
          "type": "divider"
        },
        ...news
      ],
    };
    await axios.post(webhookApi, message);
  } catch (error) {
    console.log('😱 Error has been occured.', error.message);
  }
};


(function (){
  console.log('⭐️ Start DailyBot.')
  sendMessage();
})()
