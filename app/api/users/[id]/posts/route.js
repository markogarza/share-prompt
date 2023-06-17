import { connectToDb } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something failed', {
      status: 500,
    });
  }
};
