import { demoCourses } from '@/data/content/courses';
import { demoTools } from '@/data/content/tools';
import { tutorKnowledge } from '@/data/content/tutor-knowledge';
import { findLesson } from '@/features/courses/catalog';

import { answerQuestion, createDemoTutor, matchKnowledge, matchTool } from '../demoTutor';

const sources = { knowledge: tutorKnowledge, courses: demoCourses, tools: demoTools };

describe('base di conoscenza', () => {
  it('ha id unici e rimanda solo a lezioni esistenti', () => {
    expect(new Set(tutorKnowledge.map((k) => k.id)).size).toBe(tutorKnowledge.length);
    for (const entry of tutorKnowledge) {
      if (entry.lessonId) expect(findLesson(demoCourses, entry.lessonId)).not.toBeNull();
      expect(entry.keywords.length).toBeGreaterThan(0);
    }
  });

  it('ogni domanda di approfondimento suggerita trova una risposta', () => {
    const followUps = new Set(tutorKnowledge.flatMap((k) => k.followUps));
    for (const question of followUps) {
      expect(answerQuestion(question, sources).isFallback).toBe(false);
    }
  });
});

describe('abbinamento delle domande', () => {
  it.each([
    ['Cos’è un’allucinazione?', 'hallucination'],
    ['mi spieghi i TOKEN', 'token'],
    ['Come scrivo un buon prompt per il mio negozio?', 'good-prompt'],
    ['che cos’è il few shot?', 'few-shot'],
    ['Cos’è una prompt injection', 'prompt-injection'],
    ['Che proporzioni uso per una storia 9:16?', 'aspect-ratio'],
    ['Come funziona un agente AI?', 'agent'],
    ['posso incollare dati personali dei clienti?', 'privacy'],
  ])('“%s” → %s', (question, expected) => {
    expect(matchKnowledge(question, tutorKnowledge)?.entry.id).toBe(expected);
  });

  it('riconosce gli strumenti, preferendo il nome più specifico', () => {
    expect(matchTool('Come uso Claude Code?', demoTools)?.id).toBe('claude-code');
    expect(matchTool('Claude è gratis?', demoTools)?.id).toBe('claude');
    expect(matchTool('A cosa serve n8n', demoTools)?.id).toBe('n8n');
    expect(matchTool('Parliamo di pizza', demoTools)).toBeNull();
  });
});

describe('risposte', () => {
  it('risponde su uno strumento con link alla scheda', () => {
    const reply = answerQuestion('A cosa serve Perplexity?', sources);
    expect(reply.isFallback).toBe(false);
    expect(reply.text).toContain('Perplexity');
    expect(reply.links[0]).toMatchObject({ kind: 'tool', id: 'perplexity' });
  });

  it('su un concetto rimanda alla lezione di riferimento', () => {
    const reply = answerQuestion('Cos’è il prompt chaining?', sources);
    expect(reply.links).toContainEqual(expect.objectContaining({ kind: 'lesson' }));
  });

  it('saluta', () => {
    expect(answerQuestion('Ciao', sources).text).toContain('modalità demo');
  });

  it('ammette di non sapere su argomenti fuori dai corsi', () => {
    const reply = answerQuestion('Qual è la ricetta della carbonara?', sources);
    expect(reply.isFallback).toBe(true);
    expect(reply.text).toContain('modalità demo');
    expect(reply.links).toEqual([]);
  });

  it('il provider demo si dichiara tale', async () => {
    const tutor = createDemoTutor(sources);
    expect(tutor.mode).toBe('demo');
    await expect(tutor.ask('Cos’è un token?', [])).resolves.toMatchObject({ isFallback: false });
  });
});
