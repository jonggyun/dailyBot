# Daily Bot

본 프로젝트는 아침마다 뉴스를 슬랙으로 전송해주는 Bot입니다.

# Specfication

* node.js

* typescript

* Slack Webhook

* Github Actions

* mocha

# Installation

```
git clone https://github.com/jonggyun/dailyBot.git

yarn
```

* create .env file

```
API_KEY=YOUR_NEWS_API_KEY
WEBHOOK_URL_SLACK=YOUR_SLACK_WEBHOOK_URL
```

# Description

* [NEWS API](https://newsapi.org/)를 통해 데이터를 가져옵니다.

* 가져온 데이터를 Slack Webhook에 연결하여 Slack으로 전송할 수 있게 해놨습니다.

* [Github Action](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#onschedule)의 cron 기능을 통해 정해진 시간에 CI가 진행되면서 데이터를 전송합니다.