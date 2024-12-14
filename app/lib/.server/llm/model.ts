import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { getLLMProvider, getAPIKey, getAPIModel, getAPIBaseURL } from './api-key';

type OptionalApiKey = string | undefined;

export function getAnthropicModel(apiKey: OptionalApiKey, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAIModel(apiKey: OptionalApiKey, model: string) {
  const openai = createOpenAI({
    apiKey,
  });
  return openai(model);
}

export function getOpenAILikeModel(baseURL: string, apiKey: OptionalApiKey, model: string) {
  const openai = createOpenAI({
    baseURL,
    apiKey,
  });

  return openai(model);
}

export function getModel(env: Env) {
  const provide = getLLMProvider(env);
  const apiKey = getAPIKey(env);
  const apiModel = getAPIModel(env);
  const apiBaseURL = getAPIBaseURL(env);

  switch (provide) {
    case 'OpenAI': {
      return getOpenAIModel(apiKey, apiModel);
    }
    case 'OpenAILike': {
      return getOpenAILikeModel(apiBaseURL, apiKey, apiModel);
    }
    case 'Anthropic':
    default: {
      return getAnthropicModel(apiKey, apiModel);
    }
  }
}
