import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { advocates } from './schema';

export type Advocate = InferSelectModel<typeof advocates>;
export type NewAdvocate = InferInsertModel<typeof advocates>;
