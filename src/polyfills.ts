// src/polyfills.ts
import { randomUUID } from 'crypto';
(global as any).crypto = { randomUUID };