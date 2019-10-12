export const testData = [
  {
    sourceUrls: {
      image: 'https://i.redd.it/4hrn18t4lck31.jpg',
      thumbnail: 'https://i.redd.it/4hrn18t4lck31.jpg',
    },
    keyPhrases: ['area 51', 'police', 'shopping', 'cart', 'running'],
    participants: [],
    title: 'The Area 51 raid is still happening right?',
    description: 'Me leaving area 51 with a shopping trolley that has 4 wheels',
    originalSources: [
      {
        name: 'reddit',
        url:
          'https://www.reddit.com/r/memes/comments/cz2i20/the_area_51_raid_is_still_happening_right/',
      },
    ],
    lang: 'en',
    createdAt: '2019-10-12T14:16:49.666Z',
    updatedAt: '2019-10-12T14:16:49.666Z',
  },
  {
    sourceUrls: {
      image: 'https://i.redd.it/4hrn18t4lck31.jpg',
      thumbnail: 'https://i.redd.it/4hrn18t4lck31.jpg',
    },
    keyPhrases: ['area 51', 'police', 'shopping', 'cart', 'running'],
    participants: [],
    title: 'The Area 51 raid is still happening right?',
    description: 'Me leaving area 51 with a shopping trolley that has 4 wheels',
    originalSources: [
      {
        name: 'reddit',
        url:
          'https://www.reddit.com/r/memes/comments/cz2i20/the_area_51_raid_is_still_happening_right/',
      },
    ],
    lang: 'en',
    createdAt: '2019-10-12T13:30:56.026Z',
    updatedAt: '2019-10-12T13:47:07.244Z',
  },
  {
    sourceUrls: {
      image:
        'https://preview.redd.it/z9oh7ligb0i31.jpg?width=960&crop=smart&auto=webp&s=6864f86fd0896718376cb364655cec49ccd05dad',
      thumbnail:
        'https://preview.redd.it/z9oh7ligb0i31.jpg?width=960&crop=smart&auto=webp&s=6864f86fd0896718376cb364655cec49ccd05dad',
    },
    keyPhrases: ['search', 'reddit', 'google', 'banner', 'puppies', 'running'],
    participants: [],
    title: "And that's a fact",
    description: 'Google is better than reddit to search something on reddit',
    originalSources: [
      {
        name: 'reddit',
        url: 'https://www.reddit.com/r/memes/comments/ctxvmu/and_thats_a_fact/',
      },
    ],
    lang: 'en',
    createdAt: '2019-10-12T13:03:45.783Z',
    updatedAt: '2019-10-12T13:03:45.783Z',
  },
  {
    sourceUrls: {
      image: 'https://i.redd.it/mt1p2undiwo31.jpg',
      thumbnail: 'https://i.redd.it/mt1p2undiwo31.jpg',
    },
    keyPhrases: [
      'simpsons',
      'donald',
      'trump',
      'prediction',
      'usa',
      'elections',
    ],
    participants: ['Lisa Simpson', 'Donald Trump'],
    title: 'Simpsons predicted it yet again',
    description: 'Simpsons predict the president of the USA',
    originalSources: [
      {
        name: 'reddit',
        url:
          'https://www.reddit.com/r/memes/comments/d9gvok/simpsons_predicted_it_yet_again/',
      },
    ],
    lang: 'en',
    createdAt: '2019-10-12T13:00:39.517Z',
    updatedAt: '2019-10-12T13:00:39.517Z',
  },
];

export const inputData = {
  sourceUrls: {
    image:
      'https://preview.redd.it/z9oh7ligb0i31.jpg?width=960&crop=smart&auto=webp&s=6864f86fd0896718376cb364655cec49ccd05dad',
    thumbnail:
      'https://preview.redd.it/z9oh7ligb0i31.jpg?width=960&crop=smart&auto=webp&s=6864f86fd0896718376cb364655cec49ccd05dad',
  },
  keyPhrases: ['search', 'reddit', 'google', 'banner', 'puppies', 'running'],
  participants: [],
  title: "And that's a fact",
  description: 'Google is better than reddit to search something on reddit',
  originalSources: [
    {
      name: 'reddit',
      url: 'https://www.reddit.com/r/memes/comments/ctxvmu/and_thats_a_fact/',
    },
  ],
  lang: 'en',
};

export function generateMemes(number = 1) {
  const ret = [];
  for (let i = 0; i < number; i++) {
    ret.push(testData[0]);
  }

  return JSON.parse(JSON.stringify(ret));
}
