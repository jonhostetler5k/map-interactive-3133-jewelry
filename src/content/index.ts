import { PlanSection } from '../types';

// Import all sections
import { CONTENT_EXECUTIVE_SUMMARY } from './sections/1_executive_summary';
import { CONTENT_DIGITAL_PRESENCE } from './sections/2_digital_presence';
import { CONTENT_PROSPECT_1 } from './sections/3_prospect_1';
import { CONTENT_PROSPECT_2 } from './sections/4_prospect_2';
import { CONTENT_PROSPECT_3 } from './sections/5_prospect_3';
import { CONTENT_COMPETITIVE_INTELLIGENCE } from './sections/6_competitive_intelligence';
import { CONTENT_EXECUTION_PLAN } from './sections/7_execution_plan';

export const SECTIONS: PlanSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    category: 'Strategy',
    content: CONTENT_EXECUTIVE_SUMMARY
  },
  {
    id: 'digital-presence-assessment',
    title: 'Current Digital Presence Assessment',
    category: 'Strategy',
    content: CONTENT_DIGITAL_PRESENCE
  },
  {
    id: 'prospect-1-playbook',
    title: 'Prospect 1 Playbook',
    category: 'Strategy',
    content: CONTENT_PROSPECT_1
  },
  {
    id: 'prospect-2-playbook',
    title: 'Prospect 2 Playbook',
    category: 'Strategy',
    content: CONTENT_PROSPECT_2
  },
  {
    id: 'prospect-3-playbook',
    title: 'Prospect 3 Playbook',
    category: 'Strategy',
    content: CONTENT_PROSPECT_3
  },
  {
    id: 'competitive-intelligence',
    title: 'Competitive Intelligence',
    category: 'Strategy',
    content: CONTENT_COMPETITIVE_INTELLIGENCE
  },
  {
    id: 'execution-plan',
    title: 'Execution Plan',
    category: 'Strategy',
    content: CONTENT_EXECUTION_PLAN
  }
];

export const FULL_MARKETING_PLAN = SECTIONS.map(s => s.content).join('\n\n');
