import emptyUrl from 'assets/templates/empty.que';
import animatedTextUrl from 'assets/templates/animated-text.que';
import playUrl from 'assets/templates/play.que';
import uxFlowUrl from 'assets/templates/ux-flow.que';
import wave from 'assets/templates/wave.que';
import conflictFlow from 'assets/templates/conflict.que';
import { RootState } from 'store';

export interface TemplateMeta {
  name: string;
  preview: string;
  getTemplate(): Promise<RootState>;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    name: 'Empty',
    preview: '',
    getTemplate: () => fetch(emptyUrl).then((r) => r.json()),
  },
  {
    name: 'UX Flow',
    preview: '',
    getTemplate: () => fetch(uxFlowUrl).then((r) => r.json()),
  },
  {
    name: 'Wave',
    preview: '',
    getTemplate: () => fetch(wave).then((r) => r.json()),
  },
  {
    name: 'Animated Text',
    preview: '',
    getTemplate: () => fetch(animatedTextUrl).then((r) => r.json()),
  },
  {
    name: 'Play',
    preview: '',
    getTemplate: () => fetch(playUrl).then((r) => r.json()),
  },
  {
    name: 'conflictFlow',
    preview: '',
    getTemplate: () => fetch(conflictFlow).then((r) => r.json()),
  },
];
