import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { MAX_TOKENS, MAX_QWEN_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';
import { getModel } from './model';
import { getAPIModel } from './api-key';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  const apiModel = getAPIModel(env);
  let maxToken = MAX_TOKENS;

  if (apiModel.toLowerCase().includes('qwen')) {
    maxToken = MAX_QWEN_TOKENS;
  }

  return _streamText({
    model: getModel(env),
    system: getSystemPrompt(),
    maxTokens: maxToken,
    messages: convertToCoreMessages(messages as any),
    ...options,
  });
}
