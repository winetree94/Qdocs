import { CreateEffect } from './create';
import { FadeEffect } from './fade';
import { FillEffect } from './fill';
import { MoveEffect } from './rect';
import { RemoveEffect } from './remove';
import { RotateEffect } from './rotate';
import { StrokeEffect } from './stroke';
import { TextEffect } from './text';

export * from './base';
export * from './create';
export * from './fade';
export * from './fill';
export * from './rect';
export * from './remove';
export * from './rotate';
export * from './stroke';
export * from './text';

export type QueueEffectType =
  CreateEffect |
  FadeEffect |
  FillEffect |
  MoveEffect |
  RemoveEffect |
  RotateEffect |
  StrokeEffect |
  TextEffect;

export interface WithEffects {
  effects: QueueEffectType[];
}