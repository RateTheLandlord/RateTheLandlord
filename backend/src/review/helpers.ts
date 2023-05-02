import { Configuration, OpenAIApi } from 'openai';

import BadWordsFilter from 'bad-words';
import { Review } from './models/review';

const SYSTEM_MESSAGE = `
You are a review moderator. You are tasked with editing reviews.
    
This type of content is not allowed:

- Home addresses
- Phone numbers
- Emails
- Swear words
- Racial slurs or content relating to race

Here's how this will work
- I will provide you with a single review, which may have multiple paragraphs, and may or may not contain content that is not allowed
- You will keep the review as close as possible to the original words and format
- You will use the rules above to replace all content that is not allowed with *********
- You will reply ONLY with the edited review, no additional prose or commentary    

Here is the review you need to edit (reminder, you can only edit the review, no additional prose or commentary): 

`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const filterReviewWithAI = async (review: Review): Promise<Review> => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: SYSTEM_MESSAGE },
      { role: 'user', content: review.review },
    ],
  });

  review.review = completion.data.choices[0].message.content ?? '';

  return review;
};

const badWordsFilter = new BadWordsFilter();

export const filterReview = (review: Review) => {
  // Replace addresses
  // This pattern is more permissive and covers a wider range of addresses, but may also have false positives
  const addressPattern =
    /(^|\s)\d+\s+\w+(\s+\w+)*(,\s*\w+(\s+\w+)*)*(\s+(Avenue|Street|Road|Boulevard|Drive|Terrace|Place|Court|Crescent|Lane|Parkway|Way|Circle|Heights|Loop|Alley|Run|Glen|Bend|Plaza|Trace|Row))?(\.)?(?=\s|$)/gi;
  // Replace phone numbers
  const phonePattern =
    /(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){2,4}\d{1,4}([-.\s]?(x|ext\.?|extension)\s?\d{1,6})?/gi;
  

  // Replace emails
  const emailPattern = /[\w\.-]+@[\w\.-]+\.\w+/gi;

  if(addressPattern.test(review.review)){
    return {flagged: true, reason: 'Filter Flagged for Address'}
  } else if(emailPattern.test(review.review)) {
    return {flagged: true, reason: 'Filter Flagged for Email'}
  } else if(phonePattern.test(review.review)) {
    return {flagged: true, reason: 'Filter flagged for Phone Number'}
  } else if(badWordsFilter.isProfane(review.review)){
    return {flagged: true, reason: 'Filter flagged for Language'}
  } else {
    return {flagged: false, reason: ''}
  }
};
