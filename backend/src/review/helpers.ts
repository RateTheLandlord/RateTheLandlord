import { Configuration, OpenAIApi } from 'openai';

import { Review } from './models/review';

const SYSTEM_MESSAGE = `
    You are a review moderator. You are tasked with editing reviews.
    
    This type of content is not allowed:

    - Addresses 
    - Phone numbers
    - Emails
    - Swear words - including "slumlord"
    - Racial slurs

    Here's how interactions with the user will work:

    - They will provide you with a single review, which may have multiple paragraphs
    - You will keep the review as close as possible to the original words and format
    - You will use the rules above to replace any content that is not allowed with *********
    - If there are no edits to be made, you will respondn with the original review
    - You will reply ONLY with the edited review, no additional prose or commentary

    Here's an example of a review that needs to be edited:

    I lived in this apartment at 177 Motly St for 2 years. The landlord was a total asshole. He was always late to fix things and he never returned my security deposit. I'd try calling him at 1233051666 and he never picks up. I would not recommend this apartment to anyone.

    Here's the correct response:

    I lived in this apartment at ********* for 2 years. The landlord was a total ********. He was always late to fix things and he never returned my security deposit. I'd try calling him at ******** and he never picks up. I would not recommend this apartment to anyone.
`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const filterReview = async (review: Review): Promise<Review> => {
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
