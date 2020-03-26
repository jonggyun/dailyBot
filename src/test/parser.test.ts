import { expect } from 'chai';
import { getAtricle } from '../parser';

const articles = [
  {
    source: {
        id: null,
        name: "test.com"
    },
    author: null,
    title: "news title",
    description: "news description",
    url: "homepage",
    urlToImage: "image.png",
    publishedAt: "2020-03-26T03:34:00Z",
  },
  {
    source: {
        id: null,
        name: "test.com"
    },
    author: null,
    title: "news title",
    description: "news description",
    url: "homepage",
    urlToImage: "image.png",
    publishedAt: "2020-03-26T03:34:00Z",
  },
];

describe('index.ts', function () {
  it('sholud check object', function() {
    const _articles = getAtricle(articles)
    const keys = Object.keys(_articles[0]);

    expect(keys.indexOf('title')).to.not.equal(-1);
    expect(keys.indexOf('url')).to.not.equal(-1);
    expect(keys.indexOf('description')).to.not.equal(-1);
  })
})