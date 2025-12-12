import { PlanSection } from '../types';

// Import all sections
import { CONTENT_IMPACT_OFFERING } from './sections/1_impactOffering';
import { CONTENT_IMPACT_PROSPECT } from './sections/2_impactProspect';
import { CONTENT_ROADMAP } from './sections/3_roadmap';
import { CONTENT_PLAYBOOK_AFFILIATE } from './sections/4_playbook_affiliate';
import { CONTENT_PLAYBOOK_INFLUENCER } from './sections/5_playbook_influencer';
import { CONTENT_PLAYBOOK_PODCAST } from './sections/6_playbook_podcast';
import { CONTENT_PLAYBOOK_EVENTS } from './sections/7_playbook_events';
import { CONTENT_PLAYBOOK_BOUTIQUE } from './sections/8_playbook_boutique';
import { CONTENT_PLAYBOOK_CHURCH } from './sections/9_playbook_church';

export const SECTIONS: PlanSection[] = [
  {
    id: 'impact-offering',
    title: 'IMPACT Offering',
    category: 'Strategy',
    content: CONTENT_IMPACT_OFFERING
  },
  {
    id: 'impact-prospect',
    title: 'IMPACT Prospect',
    category: 'Strategy',
    content: CONTENT_IMPACT_PROSPECT
  },
  {
    id: '90-day-roadmap',
    title: '90-Day Roadmap',
    category: 'Strategy',
    content: CONTENT_ROADMAP
  },
  {
    id: 'playbook-affiliate',
    title: 'Affiliate & Referral Partnerships',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_AFFILIATE
  },
  {
    id: 'playbook-influencer',
    title: 'Micro-Influencer Partnerships',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_INFLUENCER
  },
  {
    id: 'playbook-podcast',
    title: 'Podcast Appearances',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_PODCAST
  },
  {
    id: 'playbook-events',
    title: 'Christian Conferences & Events',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_EVENTS
  },
  {
    id: 'playbook-boutique',
    title: 'Boutique Retail Partnerships',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_BOUTIQUE
  },
  {
    id: 'playbook-church',
    title: 'Church & Ministry Partnerships',
    category: 'Playbooks',
    content: CONTENT_PLAYBOOK_CHURCH
  }
];

export const FULL_MARKETING_PLAN = SECTIONS.map(s => s.content).join('\n\n');