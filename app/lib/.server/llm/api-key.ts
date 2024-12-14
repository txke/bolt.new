import { env } from 'node:process';

export function getLLMProvider(cloudflareEnv: Env) {
  return env.VITE_LLM_PROVIDER || cloudflareEnv.VITE_LLM_PROVIDER || 'Anthropic';
}

export function getAPIKey(cloudflareEnv: Env) {
  const provide = getLLMProvider(cloudflareEnv);

  switch (provide) {
    case 'OpenAI': {
      return env.VITE_OPENAI_API_KEY || cloudflareEnv.VITE_OPENAI_API_KEY;
    }
    case 'OpenAILike': {
      return env.VITE_OPENAI_LIKE_API_KEY || cloudflareEnv.VITE_OPENAI_LIKE_API_KEY;
    }
    case 'Anthropic':
    default: {
      return env.VITE_OPENAI_API_KEY || cloudflareEnv.VITE_OPENAI_API_KEY;
    }
  }
}

export function getAPIBaseURL(cloudflareEnv: Env) {
  const provide = getLLMProvider(cloudflareEnv);

  switch (provide) {
    case 'OpenAILike': {
      return env.VITE_OPENAI_LIKE_BASE_URL || cloudflareEnv.VITE_OPENAI_LIKE_BASE_URL;
    }
    default: {
      return '';
    }
  }
}

export function getAPIModel(cloudflareEnv: Env) {
  const provide = getLLMProvider(cloudflareEnv);

  switch (provide) {
    case 'OpenAI': {
      return env.VITE_OPENAI_MODEL_NAME || cloudflareEnv.VITE_OPENAI_MODEL_NAME;
    }
    case 'OpenAILike': {
      return env.VITE_OPENAI_LIKE_MODEL_NAME || cloudflareEnv.VITE_OPENAI_LIKE_MODEL_NAME;
    }
    case 'Anthropic':
    default: {
      return env.VITE_ANTHROPIC_MODEL_NAME || cloudflareEnv.VITE_ANTHROPIC_MODEL_NAME;
    }
  }
}
